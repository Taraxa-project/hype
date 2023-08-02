// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

interface IAccessControl {
    struct RoleData {
        mapping(address => bool) members;
    }

    event RoleGranted(bytes32 indexed role, address indexed account);
    event RoleRevoked(bytes32 indexed role, address indexed account);

    function hasRole(bytes32 role, address account) external view returns (bool);

    function addRole(bytes32 role, address account) external;

    function revokeRole(bytes32 role, address account) external;
}
