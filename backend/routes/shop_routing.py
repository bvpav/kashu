import heapq

# Define the grid and its size
arr = [['.' for i in range(10)] for j in range(10)]

arr[2][2] = 'X'
arr[3][2] = 'X'
arr[4][2] = 'X'
arr[5][5] = 'X'
arr[5][6] = 'X'
arr[5][7] = 'X'

arr[2][3] = '1'
arr[4][4] = '1'
arr[3][3] = 'A'
arr[4][3] = 'A'
arr[3][4] = 'A'
arr[2][4] = 'A'

arr[2][6] = 'B'
arr[3][6] = 'B'
arr[4][6] = 'B'
arr[2][7] = 'B'
arr[3][7] = 'B'
arr[4][7] = '1'

# Helper function to print the grid


def print_grid(arr):
    for i in range(9, -1, -1):
        for j in range(10):
            print(arr[i][j], end=' ')
        print()

# Helper function to check if a move is valid


def is_valid_move(x, y, grid):
    if 0 <= x < len(grid) and 0 <= y < len(grid[0]) and grid[x][y] != 'X' and grid[x][y] != 'B' and grid[x][y] != 'A':
        return True
    return False

# Heuristic function for A* (Manhattan Distance)


def heuristic(a, b):
    return abs(a[0] - b[0]) + abs(a[1] - b[1])

# A* Pathfinding Algorithm


def a_star(start, goal, grid):
    open_set = []
    heapq.heappush(open_set, (0, start))
    came_from = {}
    g_score = {start: 0}
    f_score = {start: heuristic(start, goal)}
    while open_set:
        _, current = heapq.heappop(open_set)
        if current == goal:
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            path.reverse()
            return path
        # Adding diagonal movements
        neighbors = [(0, 1), (1, 0), (0, -1), (-1, 0),
                     (1, 1), (1, -1), (-1, 1), (-1, -1)]
        for direction in neighbors:
            neighbor = (current[0] + direction[0], current[1] + direction[1])
            if is_valid_move(neighbor[0], neighbor[1], grid):
                tentative_g_score = g_score[current] + 1
                if neighbor not in g_score or tentative_g_score < g_score[neighbor]:
                    came_from[neighbor] = current
                    g_score[neighbor] = tentative_g_score
                    f_score[neighbor] = tentative_g_score + \
                        heuristic(neighbor, goal)
                    heapq.heappush(open_set, (f_score[neighbor], neighbor))
    return []

# Function to collect all '1' items


def collect_items(start, items, grid):
    path = []
    current_position = start
    items = sorted(items, key=lambda item: heuristic(start, item))
    for item in items:
        path_segment = a_star(current_position, item, grid)
        if path_segment:
            # Exclude the last position to avoid repetition
            path.extend(path_segment[:-1])
            path.append(item)  # Collect the item
            current_position = item
        else:
            return []
    return path


# Define the start, end, and items positions
start = (0, 0)
end = (9, 9)
items = [(2, 3), (4, 4), (4, 7)]


def get_path(start, end, items, arr):
    # Collect all items and then reach the end
    full_path = collect_items(start, items, arr)
    if full_path:
        end_path = a_star(full_path[-1], end, arr)
        if end_path:
            # Avoid repetition of the last position
            full_path.extend(end_path[1:])
        else:
            print("No path found to the end position.")
    else:
        print("No path found to collect all items.")

    # Remove consecutive duplicates
    cleaned_path = [full_path[0]]
    for i in range(1, len(full_path)):
        if full_path[i] != full_path[i - 1]:
            cleaned_path.append(full_path[i])

    # Print the path
    print("Path:")
    for step in cleaned_path:
        print(step)

    return cleaned_path


print(get_path(start, end, items, arr))
print_grid(arr)
