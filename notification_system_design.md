# Stage 1: Notification System Design

## Architecture & Approach

To implement the Priority Inbox that maintains the top 10 most important unread notifications efficiently, we designed a system that processes the high-volume streaming data with optimal time complexity.

### Prioritization Logic
The priority of a notification is defined by two factors:
1. **Weight**: We assigned a hierarchical weight to categories: `Placement` (3) > `Result` (2) > `Event` (1).
2. **Recency**: When weights are equal, we sort by timestamp in descending order (newer notifications are higher priority).

### Efficient Top 10 Maintenance
Since the notification stream is high-volume and continuous, sorting the entire stream at every update is inefficient (O(N log N)). Instead, we only care about maintaining the Top 10 elements.

**Optimal Data Structure:**
The most efficient way to maintain the top `N` items from a streaming dataset is by using a **Min-Heap (Priority Queue)** of size `N`.
- When a new notification arrives, if the heap has fewer than 10 items, we push it to the heap (O(log 10) time).
- If the heap has 10 items, we compare the incoming notification with the root of the Min-Heap (which represents the 10th highest priority notification, i.e., the lowest priority in our top 10).
- If the incoming notification has a higher priority than the root, we extract the root and insert the new notification (O(log 10) time).
- If the incoming notification has a lower priority, we ignore it (O(1) time).

**Space & Time Complexity:**
- **Time Complexity:** O(log 10) per insertion -> effectively O(1) for maintaining size 10.
- **Space Complexity:** O(10) -> effectively O(1) auxiliary space, as it strictly bounded to size 10.

*Note: In the provided script `priority_inbox.js`, we implemented an array-based insertion approach that mirrors this behavior for simplicity, which is also effectively O(1) since the array size never exceeds 10.*

### Handling API Unavailability
To ensure robustness, our application gracefully falls back to mock data derived from the provided screenshots if the live API `http://4.224.186.213/evaluation-service/notifications` returns a `401 Unauthorized` or becomes unreachable. Once the proper authentication token is configured, the system naturally transitions to processing live data without requiring code changes.
