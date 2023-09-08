// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.18;

import './interfaces/IAccessControl.sol';

contract AccessControl is IAccessControl {
    mapping(bytes32 => IAccessControl.RoleData) private _roles;

    modifier onlyRole(bytes32 role) {
        require(
            hasRole(role, msg.sender),
            'AccessControl: sender must be an authorized role'
        );
        _;
    }

    function hasRole(bytes32 role, address account) public view override returns (bool) {
        return _roles[role].members[account];
    }

    function addRole(bytes32 role, address account) public override {
        require(
            account != address(0),
            'AccessControl: cannot grant role to zero address'
        );
        _roles[role].members[account] = true;
        emit RoleGranted(role, account);
    }

    function revokeRole(bytes32 role, address account) public override {
        require(
            account != address(0),
            'AccessControl: cannot revoke role from zero address'
        );
        _roles[role].members[account] = false;
        emit RoleRevoked(role, account);
    }
}
