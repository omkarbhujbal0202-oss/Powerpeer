// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PowerPeer {

    enum Status { LISTED, PURCHASED, DELIVERED, COMPLETED, DISPUTED }

    struct EnergyListing {
        string listingId;
        address seller;
        address buyer;
        uint256 units;        // in kWh
        uint256 pricePerUnit; // in wei
        uint256 totalAmount;
        Status status;
        uint256 createdAt;
    }

    mapping(string => EnergyListing) public listings;
    mapping(address => uint256) public sellerEarnings;

    event Listed(string listingId, address seller, uint256 units);
    event Purchased(string listingId, address buyer);
    event Delivered(string listingId);
    event Completed(string listingId, address seller, uint256 amount);

    // Seller lists energy
    function listEnergy(
        string memory _listingId,
        uint256 _units,
        uint256 _pricePerUnit
    ) public {
        listings[_listingId] = EnergyListing({
            listingId: _listingId,
            seller: msg.sender,
            buyer: address(0),
            units: _units,
            pricePerUnit: _pricePerUnit,
            totalAmount: _units * _pricePerUnit,
            status: Status.LISTED,
            createdAt: block.timestamp
        });
        emit Listed(_listingId, msg.sender, _units);
    }

    // Buyer purchases energy (funds locked in contract)
    function purchaseEnergy(string memory _listingId) public payable {
        EnergyListing storage l = listings[_listingId];
        require(l.status == Status.LISTED, "Not available");
        require(msg.value == l.totalAmount, "Wrong amount");
        l.buyer = msg.sender;
        l.status = Status.PURCHASED;
        emit Purchased(_listingId, msg.sender);
    }

    // Seller confirms delivery
    function confirmDelivery(string memory _listingId) public {
        EnergyListing storage l = listings[_listingId];
        require(msg.sender == l.seller, "Not seller");
        require(l.status == Status.PURCHASED, "Not purchased");
        l.status = Status.DELIVERED;
        emit Delivered(_listingId);
    }

    // Buyer confirms receipt → releases payment
    function confirmReceipt(string memory _listingId) public {
        EnergyListing storage l = listings[_listingId];
        require(msg.sender == l.buyer, "Not buyer");
        require(l.status == Status.DELIVERED, "Not delivered");
        l.status = Status.COMPLETED;
        payable(l.seller).transfer(l.totalAmount);
        emit Completed(_listingId, l.seller, l.totalAmount);
    }

    // Get listing details
    function getListing(string memory _listingId)
        public view returns (address, address, uint256, uint256, Status) {
        EnergyListing memory l = listings[_listingId];
        return (l.seller, l.buyer, l.units, l.totalAmount, l.status);
    }
}
