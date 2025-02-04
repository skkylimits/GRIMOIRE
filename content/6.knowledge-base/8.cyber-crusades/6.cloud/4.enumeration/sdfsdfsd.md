Here's a condensed version of your **Groups** chapter:

---

### **3. Groups**
- `Get-MgGroup` → Lists all groups.
- **Interesting groups to examine:**
  - **Dynamic Groups** (automatically updated based on conditions).
  - **On-prem synced groups** (important for attackers).
  - **Groups where specific users are members** (for privilege escalation).

### **Enumerating Groups:**

1. **List All Groups:**
   ```powershell
   Get-MgGroup -All
   ```

2. **Enumerate a Specific Group:**
   ```powershell
   Get-MgGroup -GroupId <GroupId>
   ```

3. **Search for Groups:**
   - Based on DisplayName (first characters only, no wildcard support):
     ```powershell
     Get-MgGroup -ConsistencyLevel eventual -Search '"DisplayName:A"'
     ```
   - Groups with “admin” in their name:
     ```powershell
     Get-MgGroup -ConsistencyLevel eventual -Search '"DisplayName:Admin"'
     ```

4. **Find Groups with Dynamic Membership:**
   ```powershell
   Get-MgGroup | Where-Object {$_.GroupTypes -eq 'DynamicMembership'}
   ```

5. **On-Prem Synced Groups:**
   ```powershell
   Get-MgGroup -All | Where-Object {$_.OnPremisesSecurityIdentifier -ne $null}
   ```

6. **Entra ID Groups (non-synced):**
   ```powershell
   Get-MgGroup -All | Where-Object {$_.OnPremisesSecurityIdentifier -eq $null}
   ```

7. **Get Members of a Group:**
   ```powershell
   Get-MgGroupMember -GroupId <GroupId>
   ```

8. **Get Groups and Roles of a Specific User:**
   ```powershell
   Get-MgUserMemberOf -UserId <UserId>
   ```

By using these commands, you can efficiently list, filter, and examine the various types of groups within Entra ID, identify dynamic groups, and uncover privilege escalation paths.
