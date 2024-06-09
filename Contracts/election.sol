// SPDX-License-Identifier: MIT
pragma solidity 0.8.9;

contract election {

    struct Candidate {
        uint256 id;
        string name;
        uint256 voteCount;
    }
}

address public owner;
