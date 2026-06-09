# Stage 1: Notification System Design

For Stage 1, I needed to design an algorithm to efficiently maintain the top 10 most important unread notifications from a continuous, high-volume stream. Since there could be thousands of notifications, sorting the entire stream every time an update arrives would be too slow (O(N log N)). 

Instead, I decided to use a **Min-Heap (Priority Queue)** strictly constrained to a size of 10.

### My Prioritization Logic
I defined the priority of a notification based on two things:
1. **Weight**: I gave each category a score. `Placement` gets 3, `Result` gets 2, and `Event` gets 1.
2. **Recency**: If the weights are exactly the same, I use the timestamp to prioritize newer notifications.

### How it Works
Since I only care about maintaining the Top 10 elements, a Min-Heap is the perfect data structure:
- When a new notification arrives, if my heap has fewer than 10 items, I just push it in.
- If the heap already has 10 items, I compare the incoming notification with the root of the Min-Heap (the root represents the lowest priority item currently in the top 10).
- If the new notification is more important than the root, I extract the root and insert the new one.
- If it's less important, I just ignore it.

### Complexity Analysis
- **Time Complexity:** Inserting into a heap of size 10 takes O(log 10) time. Since the size is bounded to a constant 10, this effectively gives me an **O(1)** time complexity per incoming notification.
- **Space Complexity:** I only ever store a maximum of 10 items at once, which means my auxiliary space complexity is **O(1)**.

*(Note: In the actual React frontend code `src/services/api.ts`, I used a constrained sorted array to implement this logic since JavaScript doesn't have a built-in Heap class, but it still achieves the exact same O(1) performance since the array never exceeds 10 elements).*

### Handling API Errors
To make my app robust, I added a fallback mechanism. If the live evaluation API (`http://4.224.186.213/evaluation-service/notifications`) crashes or my authentication token expires, my code catches the error and automatically loads hardcoded sample data. This ensures the app never crashes to a blank screen!
