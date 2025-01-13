---
id: python-01
title: 🐍 01. Lists
sidebar_position: 1
---

# 01. Lists

<iframe
  src="https://www.youtube.com/embed/QLTdOEn79Rc"
  title="Lists in Python - Advanced Python 01 - Programming Tutorial"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className="video-holidays"
>
</iframe>

Original Link: [Advanced Python](https://www.python-engineer.com/courses/advancedpython/)

---

## 1. Overview of Python Lists

A **list** is a built-in collection data type in Python. It has the following characteristics:

1. **Ordered**: The items have a defined order, and that order will not change unless you explicitly do so (e.g., by sorting or reassigning).
2. **Mutable**: You can add, remove, and modify items within the list after it is created.
3. **Allows duplicates**: Lists may contain duplicate elements.

Lists are typically used for preserving a sequence of data items and iterating over them. They are created using square brackets or the `list()` constructor.

```python
my_list = ["banana", "cherry", "apple"]
my_list_2 = list()  # creates an empty list
my_list_3 = [5, True, "apple"]  # lists can store mixed data types
my_list_4 = [0, 0, 1, 1]  # lists can contain duplicates
```

---

## 2. Comparison with Other Built-in Collection Types

Python provides several collection data types, each with unique characteristics:

- **List**  
  - Ordered  
  - Mutable  
  - Allows duplicates  
  - Syntax: `[ ]`
  
- **Tuple**  
  - Ordered  
  - Immutable  
  - Allows duplicates  
  - Syntax: `( )`

- **Set**  
  - Unordered  
  - Mutable  
  - Does **not** allow duplicates  
  - Syntax: `{ }`

- **Dictionary**  
  - Unordered (in older versions), but generally insertion-ordered in modern Python (3.7+)  
  - Mutable  
  - Indexed by keys  
  - Does **not** allow duplicate keys  
  - Syntax: `{key: value}`

- **String**  
  - Immutable sequence of characters (Unicode code points)  
  - Can be iterated over like a sequence but cannot be modified in place  

---

## 3. Creating Lists

### 3.1 Using Square Brackets

```python
list_1 = ["banana", "cherry", "apple"]
print(list_1)  # ['banana', 'cherry', 'apple']
```

### 3.2 Using the `list()` Constructor

```python
list_2 = list()
print(list_2)  # []
```

### 3.3 Mixed Data Types

```python
list_3 = [5, True, "apple"]
print(list_3)  # [5, True, 'apple']
```

### 3.4 Duplicate Elements

```python
list_4 = [0, 0, 1, 1]
print(list_4)  # [0, 0, 1, 1]
```

---

## 4. Accessing List Elements

Lists are zero-indexed, meaning the first element is at index 0.

```python
list_1 = ["banana", "cherry", "apple"]
item = list_1[0]
print(item)  # banana
```

### 4.1 Negative Indexing

Python allows negative indices, where `-1` refers to the last item, `-2` refers to the second-to-last item, and so on.

```python
item = list_1[-1]
print(item)  # apple
```

---

## 5. Modifying List Items

Lists are mutable, so you can change elements directly by assigning to a specific index.

```python
list_1[2] = "lemon"
print(list_1)  # ['banana', 'cherry', 'lemon']
```

---

## 6. Useful List Methods

Python’s list methods provide an easy way to add, remove, or inspect elements. Below are some of the most common:

```python
my_list = ["banana", "cherry", "apple"]

# 1. len(): returns the number of elements
print("Length:", len(my_list))  # Length: 3

# 2. append(): adds an element at the end
my_list.append("orange")

# 3. insert(): inserts an element at a specific position
my_list.insert(1, "blueberry")
print(my_list)  
# ['banana', 'blueberry', 'cherry', 'apple', 'orange']

# 4. pop(): removes and returns the item at the given position (last if none specified)
item = my_list.pop()
print("Popped item:", item)  
# Popped item: orange

# 5. remove(): removes the first occurrence of a value
my_list.remove("cherry")
print(my_list)  
# ['banana', 'blueberry', 'apple']

# 6. clear(): removes all items from the list
my_list.clear()
print(my_list)  # []

# 7. reverse(): reverses the items in place
my_list = ["banana", "cherry", "apple"]
my_list.reverse()
print("Reversed:", my_list)  
# Reversed: ['apple', 'cherry', 'banana']

# 8. sort(): sorts the list in ascending order in place
my_list.sort()
print("Sorted:", my_list)  
# Sorted: ['apple', 'banana', 'cherry']

# 9. sorted(): returns a new list without modifying the original
my_list = ["banana", "cherry", "apple"]
new_list = sorted(my_list)
print(new_list)  # ['apple', 'banana', 'cherry']
print(my_list)   # ['banana', 'cherry', 'apple']

# 10. Other operations
list_with_zeros = [0] * 5
print(list_with_zeros)  # [0, 0, 0, 0, 0]

list_concat = list_with_zeros + my_list
print(list_concat)  # [0, 0, 0, 0, 0, 'banana', 'cherry', 'apple']

string_to_list = list("Hello")
print(string_to_list)  # ['H', 'e', 'l', 'l', 'o']
```

---

## 7. Copying Lists

Be careful when copying lists in Python. Assigning one list variable to another (using `=`) only copies the reference, not the actual list.

```python
list_org = ["banana", "cherry", "apple"]
list_copy = list_org  # Both variables refer to the same list
list_copy.append(True)
print(list_copy)  # ['banana', 'cherry', 'apple', True]
print(list_org)   # ['banana', 'cherry', 'apple', True]
```

To actually copy the contents, use one of these approaches:
- `copy()` method
- `list()` constructor
- Slicing (`[:]`)

```python
list_org = ["banana", "cherry", "apple"]
list_copy = list_org.copy()  
# Or: list_copy = list(list_org)
# Or: list_copy = list_org[:]

list_copy.append(True)
print(list_copy)  # ['banana', 'cherry', 'apple', True]
print(list_org)   # ['banana', 'cherry', 'apple']
```

---

## 8. Iterating Over Lists

A common pattern is using a `for ... in` loop to iterate over each item:

```python
list_1 = ["banana", "cherry", "lemon"]
for item in list_1:
    print(item)
# banana
# cherry
# lemon
```

---

## 9. Checking for Existence of an Item

```python
if "banana" in list_1:
    print("yes")
else:
    print("no")
# yes
```

---

## 10. Slicing Lists

Slicing allows you to extract a sub-part of a list. The syntax is `[start:stop:step]`.

```python
a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

b = a[1:3]     # from index 1 up to (but not including) 3
print(b)       # [2, 3]

b = a[2:]      # from index 2 to the end
print(b)       # [3, 4, 5, 6, 7, 8, 9, 10]

b = a[:3]      # from the start up to index 3 (not included)
print(b)       # [1, 2, 3]

# Replacing a slice with a single item (you must supply an iterable)
a[0:3] = [0]
print(a)       # [0, 4, 5, 6, 7, 8, 9, 10]

b = a[::2]     # from start to end, stepping by 2
print(b)       # [0, 5, 7, 9]

a = a[::-1]    # reverse the list by negative step
print(a)       # [10, 9, 8, 7, 6, 5, 4, 0]

b = a[:]       # copy the list using slicing
print(b)       # [10, 9, 8, 7, 6, 5, 4, 0]
```

---

## 11. List Comprehensions

A **list comprehension** is a concise way to create a new list by applying an expression to each item in an existing sequence:

```python
a = [1, 2, 3, 4, 5, 6, 7, 8]
b = [i * i for i in a]
print(b)  # [1, 4, 9, 16, 25, 36, 49, 64]
```

You can also include conditions within a list comprehension:

```python
c = [x for x in a if x % 2 == 0]
print(c)  # [2, 4, 6, 8]
```

---

## 12. Nested Lists

Lists can contain other lists (as well as other container types), forming a nested or multidimensional structure:

```python
a = [[1, 2], [3, 4]]
print(a)      # [[1, 2], [3, 4]]
print(a[0])   # [1, 2]
```

---

## 13. Additional Points and Best Practices

1. **Performance**:  
   - Accessing elements by index is O(1).  
   - Appending to the end of a list is amortized O(1).  
   - Inserting or removing items in the middle can be O(n) (as elements may need to shift).

2. **Pitfalls**:  
   - Copying a list incorrectly can lead to unexpected changes in both the original and the “copy” (since they refer to the same list in memory).  
   - Slicing can create new lists, which is useful for creating a real copy.

3. **Reading the Docs**:  
   - Consult the official Python documentation for further details on methods, performance, and advanced usage:  
     [Python List Documentation](https://docs.python.org/3/tutorial/datastructures.html)

:::info[Info]

**Amortized O(1)** means that while a single operation may occasionally take more than constant time, **the *average* time per operation over a sequence of many operations is still constant**.

In the context of Python lists:

- Appending to a list is usually O(1) because Python maintains some extra space at the end of the list for future growth.
- When that space runs out, Python must reallocate the entire list to a new memory location with more space. This reallocation can take O(n) time for that single operation because it involves copying all elements.
- However, these costly reallocation events happen **infrequently** (e.g., when the list grows to a threshold). Most of the time, the append operation is O(1).
- If you spread out these occasional O(n) reallocations over a large number of appends, the **average** cost per append becomes O(1).

Hence, we say that appending to a list is **amortized O(1)**: the long-term average time per append remains constant, even though individual operations may sometimes take longer.

:::

---

## Conclusion

**Lists** in Python are among the most versatile and commonly used data structures. Their mutable nature, support for duplicates, and ease of iteration make them suitable for a wide range of use cases—from simple scripts to complex data processing tasks. By understanding their methods, slicing techniques, and potential pitfalls, you can harness the full power of Python lists in your own projects.