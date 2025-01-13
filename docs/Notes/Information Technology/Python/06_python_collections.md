---
id: python-06
title: 🐍 06. Collections
sidebar_position: 7
---

# 06. Collections

<iframe
  src="https://www.youtube.com/embed/UdcPhnNjSEw"
  title="Collections in Python - Advanced Python 06 - Programming Tutorial"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className="video-holidays"
>
</iframe>

Original Link: [Advanced Python](https://www.python-engineer.com/courses/advancedpython/)

---

## 1. Introduction to the `collections` Module

The `collections` module in Python **implements specialized container datatypes** that build upon and/or extend the capabilities of Python’s built-in container types (lists, tuples, dicts, and sets). These specialized containers are designed for specific use cases where one of the default data structures may not suffice or might be inefficient.

### Key Data Structures in `collections`

1. **`namedtuple`**: Factory function for creating **tuple subclasses** with **named fields**.  
2. **`OrderedDict`**: A dictionary subclass that **remembers insertion order**.  
3. **`Counter`**: A dictionary subclass designed for **counting** hashable objects.  
4. **`defaultdict`**: A dictionary subclass that calls a factory function to **supply default values** for missing keys.  
5. **`deque`**: A **double-ended queue** with fast appends and pops from both ends.

Additionally, Python 3 introduced other tools (e.g., **`ChainMap`**, **`UserDict`**, **`UserList`**, **`UserString`**), which can be seen in the [official docs](https://docs.python.org/3/library/collections.html).

---

## 2. `namedtuple`

A **`namedtuple`** is a factory function for creating tuple-like objects, but with **field names** and a class name. This improves the readability and self-documentation of code, since you can access the tuple’s items by **field name** rather than numeric index.

### Why Use `namedtuple`?

- Maintain the **lightweight, immutable** properties of tuples.
- Improve code clarity by allowing `my_tuple.x` instead of `my_tuple[0]`.
- Provide a quick alternative to creating a full class or data structure for small data objects.

### Basic Usage

```python
from collections import namedtuple

# Create a namedtuple class 'Point' with fields 'x' and 'y'
Point = namedtuple('Point', 'x, y')

# Instantiate
pt = Point(1, -4)

print(pt)           # Point(x=1, y=-4)
print(pt._fields)   # ('x', 'y')
print(type(pt))     # <class '__main__.Point'>
print(pt.x, pt.y)   # 1 -4
```

**Common use cases**:  
- Representing coordinates (`x, y`), geometry points, or other small data structures.
- Returning multiple related values from a function in a clear, documented fashion.
  
You can also use a namedtuple for objects like `Person`, `Car`, or similar quick prototypes without building a custom class:

```python
Person = namedtuple('Person', 'name, age')
friend = Person(name='Tom', age=25)
print(friend.name, friend.age)  # Tom 25
```

---

## 3. `OrderedDict`

**`OrderedDict`** is a dictionary subclass that **remembers the order** in which its keys were first inserted. Before Python 3.7, the built-in `dict` did not strictly guarantee insertion order; `OrderedDict` was often used to preserve iteration order. Starting in Python 3.7+, regular dictionaries **do** remember insertion order as a language feature, making `OrderedDict` less necessary in many cases.

### Why Use `OrderedDict`?

- You need a dictionary that can be **reordered** or manipulated for ordering.  
- You want to explicitly emphasize and rely on order-related operations (e.g., `move_to_end`, reordering methods).

### Basic Usage

```python
from collections import OrderedDict

ordinary_dict = {}
ordinary_dict['a'] = 1
ordinary_dict['b'] = 2
ordinary_dict['c'] = 3
ordinary_dict['d'] = 4
ordinary_dict['e'] = 5

print(ordinary_dict)
# For Python 3.7+ => {'a': 1, 'b': 2, 'c': 3, 'd': 4, 'e': 5}

ordered_dict = OrderedDict()
ordered_dict['a'] = 1
ordered_dict['b'] = 2
ordered_dict['c'] = 3
ordered_dict['d'] = 4
ordered_dict['e'] = 5

print(ordered_dict)
# OrderedDict([('a', 1), ('b', 2), ('c', 3), ('d', 4), ('e', 5)])
```

In older Python versions (pre-3.7), iterating over `ordinary_dict` might yield a different order, but `OrderedDict` guaranteed the insertion order. Even now, you might prefer `OrderedDict` if you want **methods** like `move_to_end(key, last=True)` or need to reorder the dictionary for some specialized logic.

---

## 4. `Counter`

A **`Counter`** is a dictionary subclass that’s designed to **count** hashable objects. The keys are the items (e.g., characters or numbers), and the values represent the **counts** of those items.

### Why Use `Counter`?

- Quickly tally or count occurrences of items in a list, string, or other iterable.
- Obtain the most common elements easily.

### Basic Usage

```python
from collections import Counter

a = "aaaaabbbbcccdde"
my_counter = Counter(a)
print(my_counter)
# Counter({'a': 5, 'b': 4, 'c': 3, 'd': 2, 'e': 1})

print(my_counter.items())   # dict_items([('a', 5), ('b', 4), ...])
print(my_counter.keys())    # dict_keys(['a', 'b', 'c', 'd', 'e'])
print(my_counter.values())  # dict_values([5, 4, 3, 2, 1])

my_list = [0, 1, 0, 1, 2, 1, 1, 3, 2, 3, 2, 4]
my_counter = Counter(my_list)
print(my_counter)
# Counter({1: 4, 2: 3, 0: 2, 3: 2, 4: 1})

# most_common() - get the items with highest count
print(my_counter.most_common(1))  # [(1, 4)]

# elements() - iterator of elements repeating as many times as the count
print(list(my_counter.elements()))
# [0, 0, 1, 1, 1, 1, 2, 2, 2, 3, 3, 4]
```

**Other features**: You can add or subtract Counters, intersect them, or convert them to a regular dict if needed.

---

## 5. `defaultdict`

A **`defaultdict`** is a subclass of `dict` that **automatically initializes a default value** when a key is accessed that does not exist in the dictionary. This saves you from having to check if a key is present or from manually initializing empty collections.

### Why Use `defaultdict`?

- Avoid repetitive checks for missing keys.
- Effortlessly group values (e.g., automatically creating a list when a new key is encountered).

### Basic Usage

```python
from collections import defaultdict

# Example 1: default int
d = defaultdict(int)
d['yellow'] = 1
d['blue'] = 2
print(d.items())    # dict_items([('yellow', 1), ('blue', 2)])
print(d['green'])   # 0, instead of a KeyError

# Example 2: default list
d = defaultdict(list)
s = [('yellow', 1), ('blue', 2), ('yellow', 3), ('blue', 4), ('red', 5)]
for k, v in s:
    d[k].append(v)

print(d.items())    # dict_items([('yellow', [1, 3]), ('blue', [2, 4]), ('red', [5])])
print(d['green'])   # [] - automatically created list
```

**Common Use Cases**:
- Counting or grouping items without writing extra logic for missing keys.
- Building adjacency lists in graph algorithms (where each node’s edges can be appended to a list automatically).

---

## 6. `deque`

A **`deque`** (double-ended queue) is a **list-like container** offering efficient appends and pops from **both ends**. It’s designed for fast, O(1) insertions/removals at either end, making it ideal for queue or stack implementations.

### Why Use `deque`?

- Implement **queues** (FIFO) or **stacks** (LIFO) efficiently.
- Perform **popleft()** or **pop()** in constant time, which can be slow on normal lists if done frequently at the left end.
- Ideal for sliding window problems or scenarios needing rotation.

### Basic Usage

```python
from collections import deque

d = deque()

# append() - add to the right end
d.append('a')
d.append('b')
print(d)  # deque(['a', 'b'])

# appendleft() - add to the left end
d.appendleft('c')
print(d)  # deque(['c', 'a', 'b'])

# pop() - remove and return from the right
print(d.pop())  # b
print(d)        # deque(['c', 'a'])

# popleft() - remove and return from the left
print(d.popleft()) # c
print(d)           # deque(['a'])

# clear() - remove all
d.clear()
print(d)           # deque([])
```

#### Extending, Counting, and Rotating

```python
d = deque(['a', 'b', 'c', 'd'])

# extend to the right
d.extend(['e', 'f', 'g'])  
# now deque(['a', 'b', 'c', 'd', 'e', 'f', 'g'])

# extendleft() - adds to the left in the order given
d.extendleft(['h', 'i', 'j']) 
# note 'j' ends up being the leftmost
# deque(['j', 'i', 'h', 'a', 'b', 'c', 'd', 'e', 'f', 'g'])

print(d.count('h'))  # count occurrences of an item -> 1

# rotate() - rotate the deque n steps
d.rotate(1) 
# 1 step to the right 
# now deque(['g', 'j', 'i', 'h', 'a', 'b', 'c', 'd', 'e', 'f'])

d.rotate(-2)  
# 2 steps to the left
# now deque(['i', 'h', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'j'])
```

**Common Use Cases**:
- Implementing BFS or queue-based algorithms in a memory-efficient manner.
- Handling large sequences with frequent additions/removals at both ends.
- Sliding window operations where you rotate the deque or pop from left/right as data updates.

---

## 7. Additional Collections in Python 3

Along with the more frequently used `namedtuple`, `OrderedDict`, `Counter`, `defaultdict`, and `deque`, the **`collections`** module also includes the following:

1. **`ChainMap`**  
2. **`UserDict`**  
3. **`UserList`**  
4. **`UserString`**

Each of these provides specialized functionality that can simplify certain programming tasks. You can find more detailed usage in the [official Python docs](https://docs.python.org/3/library/collections.html).

---

### 7.1 `ChainMap`

A **`ChainMap`** groups multiple dictionaries (or other mappings) together so that they can be treated as a single, logical mapping. Lookups scan each mapping in a defined order and return the first match. This is particularly useful for:

- **Layered configurations**: For example, merging a “defaults” dictionary with a “user settings” dictionary and an “environment variable” dictionary, in that priority order.
- **Nested scopes**: Simulating scope chains (e.g., local, nonlocal, global) as found in some languages.

#### Example: Using `ChainMap`

```python
from collections import ChainMap

defaults = {"theme": "light", "showLineNumbers": True, "autosave": False}
env_settings = {"theme": "dark", "autosave": True}
user_settings = {"showLineNumbers": False}

# Chain multiple dictionaries
settings = ChainMap(user_settings, env_settings, defaults)

print(settings["theme"])            # 'dark' -> from env_settings
print(settings["showLineNumbers"])  # False  -> from user_settings
print(settings["autosave"])         # True   -> from env_settings
```

**How it works**:
1. Python checks `user_settings` first.  
2. If the key is not found, it checks `env_settings`.  
3. Finally, it checks `defaults`.

When assigning a value to a key, the **first dictionary** in the chain is updated:

```python
settings["theme"] = "blue"
print(user_settings)     # {'showLineNumbers': False, 'theme': 'blue'}
print(env_settings)      # {'theme': 'dark', 'autosave': True}
print(defaults)          # {'theme': 'light', 'showLineNumbers': True, 'autosave': False}

# Notice it did NOT update 'env_settings' or 'defaults'.
# Instead, it added/overwrote 'theme' in user_settings
```

`ChainMap` also provides useful methods like `maps` (the list of dictionaries), `new_child()`, and `parents` to work with dynamically changing scopes or layered configurations.

---

### 7.2 `UserDict`

**`UserDict`** is a **wrapper class around standard dictionary objects**. It acts like a dictionary but is designed to be **easily extended** via subclassing. Instead of subclassing `dict` directly (which can have tricky edge cases), you can subclass `UserDict` and leverage its internal `data` attribute (a regular `dict`) for storing items. This provides a cleaner, more predictable approach to customizing dictionary behavior.

#### Example: Subclassing `UserDict`

```python
from collections import UserDict

class MyDict(UserDict):
    def __getitem__(self, key):
        # Here, we automatically convert the key to lowercase for lookups
        key = str(key).lower()
        return super().__getitem__(key)
    
    def __setitem__(self, key, value):
        # Convert key to lowercase on assignment
        key = str(key).lower()
        super().__setitem__(key, value)

# Create an instance
d = MyDict()
d['KEY'] = "value"
print(d['kEy'])    # "value"
print(d.data)      # {'key': 'value'}
```

**Use cases**:
- Enforcing special rules for keys (e.g., case-insensitive or restricted sets of keys).  
- Adding debugging statements or logging whenever items are added, modified, or removed.  
- Overriding special dictionary methods without worrying about edge cases in the built-in `dict`.

---

### 7.3 `UserList`

**`UserList`** is similar to `UserDict` but for **list-like** containers. It provides a wrapper around a standard Python `list` accessible via the `.data` attribute. By inheriting from `UserList`, you can create list-like classes with customized behaviors for item insertion, deletion, or retrieval.

#### Example: Subclassing `UserList`

```python
from collections import UserList

class MyList(UserList):
    def append(self, item):
        print(f"Appending {item}...")
        super().append(item)
    
    def pop(self, index=-1):
        print(f"Popping from index {index}...")
        return super().pop(index)

my_list = MyList([1, 2, 3])

my_list.append(4)           # "Appending 4..."
print(my_list)              # [1, 2, 3, 4]

popped_item = my_list.pop() # "Popping from index -1..."
print(popped_item)          # 4
print(my_list)              # [1, 2, 3]
```

**Use cases**:
- Logging, monitoring, or validating data whenever items are added or removed.  
- Restricting certain operations (e.g., limiting maximum length, forbidding certain data types).  
- Creating specialized list-like objects (e.g., a “history” list that truncates older entries automatically).

---

### 7.4 `UserString`

**`UserString`** is a **wrapper around standard Python strings**. Like `UserDict` and `UserList`, it’s designed to help you easily customize or extend how strings behave without diving into deeper internals. It stores the actual string in the `.data` attribute.

#### Example: Subclassing `UserString`

```python
from collections import UserString

class MyString(UserString):
    def __init__(self, seq):
        # Force the string to be uppercase internally
        super().__init__(str(seq).upper())
    
    def append(self, s):
        # We can't actually change an immutable string in place,
        # but we can create a new string for demonstration
        self.data = self.data + str(s).upper()

s = MyString("Hello")
print(s)               # HELLO

s.append(" world!")
print(s)               # HELLO WORLD!
```

**Use cases**:
- Creating read-only or partially restricted string objects.  
- Forcing custom transformations (e.g., always store strings in uppercase or remove forbidden characters).  
- Adding utility methods for specialized string manipulation.

---

### When to Use These Additional Collections?

- **`ChainMap`**: Layering multiple dictionaries (settings, environment, defaults) for combined lookups without manually merging them.  
- **`UserDict`**: When you need a dictionary-like object but want to cleanly override or extend built-in dict functionality.  
- **`UserList`**: Custom list behaviors, such as logging, restricting data types, or automatically truncating contents.  
- **`UserString`**: Specialized string behaviors, like forcing case conventions, logging changes, or disallowing certain operations.

---

**Conclusion**

These additional classes in the `collections` module (`ChainMap`, `UserDict`, `UserList`, `UserString`) can greatly simplify code when you need **custom behavior** for mappings, lists, or strings. By leveraging these base classes, you avoid the pitfalls of directly subclassing built-in types and gain a more predictable internal structure for your custom container logic.  

Whether you’re merging settings from multiple sources (`ChainMap`) or ensuring consistent transformations on your list/string/dictionary data (`User*` classes), these tools offer a structured and Pythonic approach to specialized data handling.

---

## 8. Summary and When to Use Which

- **`namedtuple`**: A lightweight way to create an **immutable** “object” with named fields. Great for readable, self-documenting code when returning or storing fixed sets of data.
- **`OrderedDict`**: Maintains insertion order in a dictionary. Useful for older Python versions (lower than 3.7) or advanced reordering operations that standard dict doesn’t support.
- **`Counter`**: Ideal for counting, tallies, or finding the most common items in an iterable. Built for quick frequency analysis.
- **`defaultdict`**: Automatically initializes missing keys with a default (e.g., `int`, `list`, or any other factory function). Eliminates the need for explicit key checks.
- **`deque`**: A double-ended queue with O(1) appends/pops from **both ends**. Perfect for implementing queues, stacks, or performing rotations.

By using these data types from the **`collections`** module, you can make your code more **efficient**, **readable**, and **focused** on the problem at hand—rather than manually re-implementing data structures or housekeeping logic.