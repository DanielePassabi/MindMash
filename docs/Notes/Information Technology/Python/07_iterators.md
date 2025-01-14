---
id: python-07
title: 🐍 07. Iterators
sidebar_position: 8
---

# 07. Iterators

<iframe
  src="https://www.youtube.com/embed/3ecISAkioPc"
  title="Iterators in Python - Advanced Python 07 - Programming Tutorial"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className="video-holidays"
>
</iframe>

Original Link: [Advanced Python](https://www.python-engineer.com/courses/advancedpython/)

---

## 1. Introduction to the `itertools` Module

The `itertools` module in Python provides a rich set of tools for working with iterators. Iterators are objects that allow traversal through all elements of a collection (like lists, tuples, or strings) one at a time. The `itertools` module includes functions to construct and manipulate iterators, making complex operations more efficient and concise.

The functions in this module can be grouped into the following categories:

1. **Infinite Iterators**: Functions that produce infinite iterators, such as `count`, `cycle`, and `repeat`.
2. **Iterators Terminating on Input**: Functions that process finite iterables and return iterators, like `product`, `permutations`, `combinations`, and `accumulate`.
3. **Combinatoric Iterators**: Specialized tools to generate combinatorial sets of data efficiently.

For a full reference, visit the [official documentation](https://docs.python.org/3/library/itertools.html).

---

## 2. Infinite Iterators

### `count(start, step)`
Generates an infinite sequence of evenly spaced values starting from `start` and incremented by `step`.

```python
from itertools import count

for i in count(10, 2):
    print(i)
    if i > 20:
        break
# Output: 10, 12, 14, 16, 18, 20, 22
```

### `cycle(iterable)`
Creates an infinite loop cycling through the elements of an iterable.

```python
from itertools import cycle

count = 0
for item in cycle(['A', 'B', 'C']):
    print(item)
    count += 1
    if count == 6:
        break
# Output: A, B, C, A, B, C
```

### `repeat(object, times)`
Repeats an object infinitely or for a specified number of times.

```python
from itertools import repeat

for item in repeat('Hello', 3):
    print(item)
# Output: Hello, Hello, Hello
```

---

## 3. Iterators Terminating on Input

### `product(*iterables, repeat=1)`
Computes the Cartesian product of input iterables, equivalent to nested for-loops.

```python
from itertools import product

prod = product([1, 2], [3, 4])
print(list(prod))
# Output: [(1, 3), (1, 4), (2, 3), (2, 4)]

prod = product([1, 2], repeat=2)
print(list(prod))
# Output: [(1, 1), (1, 2), (2, 1), (2, 2)]
```

### `permutations(iterable, r=None)`
Generates all possible permutations (order matters) of `r` elements from the input iterable.

```python
from itertools import permutations

perm = permutations([1, 2, 3])
print(list(perm))
# Output: [(1, 2, 3), (1, 3, 2), (2, 1, 3), ...]

perm = permutations([1, 2, 3], 2)
print(list(perm))
# Output: [(1, 2), (1, 3), (2, 1), ...]
```

### `combinations(iterable, r)`
Generates all combinations (order does not matter) of `r` elements from the iterable.

```python
from itertools import combinations

comb = combinations([1, 2, 3], 2)
print(list(comb))
# Output: [(1, 2), (1, 3), (2, 3)]
```

### `combinations_with_replacement(iterable, r)`
Generates combinations of `r` elements with replacement allowed.

```python
from itertools import combinations_with_replacement

comb_wr = combinations_with_replacement([1, 2, 3], 2)
print(list(comb_wr))
# Output: [(1, 1), (1, 2), (1, 3), ...]
```

:::info[Permutations VS Combinations]

Understanding the difference between **permutations** and **combinations** can be tricky at first, but the key distinction is whether **order matters**.

1. **Permutations**
   - ***Order matters***.
   - The arrangement of elements is significant.
   - Example: Arranging 3 letters `A`, `B`, and `C`:
     - Permutations: `ABC`, `ACB`, `BAC`, `BCA`, `CAB`, `CBA` (6 possibilities).

2. **Combinations**
   - ***Order does not matter***.
   - The arrangement is not significant—only the selection counts.
   - Example: Choosing 2 letters from `A`, `B`, and `C`:
     - Combinations: `{A, B}`, `{A, C}`, `{B, C}` (3 possibilities).

#### **Python Examples**

##### **Permutations in Python**
In Python, the `itertools.permutations` function generates permutations. Each permutation is a tuple of elements.

```python
from itertools import permutations

data = [1, 2, 3]

# Generate all permutations of length 2
perm = permutations(data, 2)
print(list(perm))
# Output: [(1, 2), (1, 3), (2, 1), (2, 3), (3, 1), (3, 2)]
```

##### **Combinations in Python**
The `itertools.combinations` function generates combinations, ignoring the order.

```python
from itertools import combinations

data = [1, 2, 3]

# Generate all combinations of length 2
comb = combinations(data, 2)
print(list(comb))
# Output: [(1, 2), (1, 3), (2, 3)]
```

:::

---

## 4. Specialized Iterators

### `accumulate(iterable, func=operator.add)`
Returns accumulated sums or results of other binary functions.

```python
from itertools import accumulate
import operator

acc = accumulate([1, 2, 3, 4])
print(list(acc))
# Output: [1, 3, 6, 10]

acc = accumulate([1, 2, 3, 4], func=operator.mul)
print(list(acc))
# Output: [1, 2, 6, 24]
```

### `groupby(iterable, key=None)`
Groups consecutive elements in an iterable based on a key function.

```python
from itertools import groupby

group_obj = groupby([1, 2, 2, 3, 4], key=lambda x: x % 2 == 0)
for key, group in group_obj:
    print(key, list(group))
# Output: False [1]
#         True [2, 2]
#         False [3]
#         True [4]
```

#### Deep Dive into `groupby(iterable, key=None)`

The `groupby()` function in Python’s `itertools` module is a tool for grouping consecutive elements of an iterable based on a specified key function. It is particularly useful when working with sorted data.

#### Key Points:
1. **Behavior**: `groupby()` only groups **consecutive elements** sharing the same key. To group all similar elements regardless of order, you need to sort the iterable first.
2. **Output**: Yields pairs `(key, group)` where:
   - `key` is the value of the key function for the current group.
   - `group` is an iterator of the elements belonging to the group.

#### General Syntax:
```python
itertools.groupby(iterable, key=None)
```
- **`iterable`**: Any iterable (e.g., list, tuple, string).
- **`key`**: A function applied to each element to determine its group.

#### Detailed Examples

##### Example 1: Group Consecutive Numbers

Group consecutive numbers as even or odd:

```python
from itertools import groupby

nums = [1, 1, 2, 2, 3, 4, 4, 5]
grouped = groupby(nums, key=lambda x: x % 2 == 0)

for is_even, group in grouped:
    print(f"Even: {is_even}, Group: {list(group)}")
# Output:
# Even: False, Group: [1, 1]
# Even: True, Group: [2, 2]
# Even: False, Group: [3]
# Even: True, Group: [4, 4]
# Even: False, Group: [5]
```

##### Example 2: Group Strings by Length

Group a list of words based on their length:

```python
words = ["hello", "hi", "world", "python", "code", "yes"]
grouped = groupby(sorted(words, key=len), key=len)

for length, group in grouped:
    print(f"Length: {length}, Words: {list(group)}")
# Output:
# Length: 2, Words: ['hi']
# Length: 3, Words: ['yes']
# Length: 4, Words: ['code']
# Length: 5, Words: ['hello', 'world']
# Length: 6, Words: ['python']
```

*Note: `words` was sorted by `len` before using `groupby`. This explains the output.*

#### Summary of Insights

- **Sort Input**: To ensure proper grouping, sort the input iterable based on the key function.
- **Iterate Through Group**: Use `list(group)` to consume the group iterator immediately or iterate lazily for performance.
- **Custom Keys**: Key functions can be lambdas, named functions, or attribute access for complex objects.

---

## 5. Practical Examples of `itertools`

1. **Efficient Nested Loops**:
   Use `product` instead of manual nested loops:
   ```python
   from itertools import product
   for x, y in product(range(2), range(3)):
       print(x, y)
    # Output:
    # 0 0
    # 0 1
    # 0 2
    # 1 0
    # 1 1
    # 1 2
   ```

2. **Accumulate with Custom Functions**:
   Aggregate values with a custom logic:
   ```python
   acc = accumulate([3, 1, 4, 1, 5, 9], func=max)
   print(list(acc))
   # Output:
   # [3, 3, 4, 4, 5, 9]
   ```

3. **Data Grouping**:
   Group people by a shared attribute (e.g., age):
   ```python
   persons = [{'name': 'Alice', 'age': 30}, {'name': 'Bob', 'age': 30}, {'name': 'Charlie', 'age': 35}]
   for age, group in groupby(sorted(persons, key=lambda x: x['age']), key=lambda x: x['age']):
       print(age, list(group))
   # Output:
   # 30 [{'name': 'Alice', 'age': 30}, {'name': 'Bob', 'age': 30}]
   # 35 [{'name': 'Charlie', 'age': 35}]
   ```

---

## Conclusion

The `itertools` module is a powerful companion for handling iterators in Python. By utilizing its tools, you can simplify and optimize your code for operations involving iteration, combinations, and aggregation.
