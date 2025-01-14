---
id: python-08
title: 🐍 08. Lambda
sidebar_position: 8
---

# 08. Lambda

<iframe
  src="https://www.youtube.com/embed/D2TJ9wvSP94"
  title="Lambda in Python - Advanced Python 08 - Programming Tutorial - Map Filter Reduce"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className="video-holidays"
>
</iframe>

Original Link: [Advanced Python](https://www.python-engineer.com/courses/advancedpython/)

---

## Comprehensive Guide to Lambda Functions in Python

Lambda functions are a compact way to define small, anonymous functions in Python. Unlike regular functions, which are created using the `def` keyword, lambda functions are defined in a single line with the `lambda` keyword.

---

## 1. Syntax and Structure
The basic syntax of a lambda function is:
```python
lambda arguments: expression
```
- **`arguments`**: The input parameters to the function (can be zero or more).
- **`expression`**: A single expression that is evaluated and returned.

**Example**:
```python
# A lambda function that adds 10 to the input
add_10 = lambda x: x + 10
print(add_10(5))  # Output: 15
```

Lambda functions are **limited to a single expression** and cannot contain statements or multiple expressions.

---

## 2. Characteristics of Lambda Functions
- **Anonymous**: Unlike named functions created with `def`, lambda functions don’t require a name.
- **Inline**: They are typically used as inline functions.
- **Single Expression**: A lambda function evaluates and returns the result of a single expression.

---

## 3. When to Use Lambda Functions
Lambda functions are best suited for **short-lived, simple operations** where defining a separate named function would be overkill. Common use cases include:
1. As arguments to higher-order functions like `map()`, `filter()`, and `reduce()`.
2. Inline operations that need quick and simple definitions.
3. Custom key functions for sorting.

---

## 4. Examples

### Basic Examples
```python
# A lambda function that multiplies two numbers
multiply = lambda x, y: x * y
print(multiply(3, 5))  # Output: 15

# A lambda function with no arguments
say_hello = lambda: "Hello, World!"
print(say_hello())  # Output: Hello, World!
```

---

## 5. Lambda in Functions

Lambda functions can be used inside other functions to create customizable behaviors.

**Example**: Returning a lambda from a function
```python
def multiplier(n):
    return lambda x: x * n

double = multiplier(2)
print(double(5))  # Output: 10

triple = multiplier(3)
print(triple(5))  # Output: 15
```

---

## 6. Lambda for Sorting

Lambda functions are commonly used as custom `key` parameters in sorting functions like `sorted()`.

**Example 1**: Sort by the second element in a tuple
```python
points = [(1, 9), (4, 1), (5, -3), (10, 2)]
sorted_points = sorted(points, key=lambda x: x[1])
print(sorted_points)
# Output: [(5, -3), (4, 1), (10, 2), (1, 9)]
```

**Example 2**: Sort by absolute value
```python
numbers = [-4, -1, 2, 3, -3]
sorted_numbers = sorted(numbers, key=lambda x: abs(x))
print(sorted_numbers)
# Output: [-1, 2, -3, 3, -4]
```

---

## 7. Lambda with Higher-Order Functions

### `map()`
The `map()` function applies a function to each item in an iterable.

```python
nums = [1, 2, 3, 4]
squared = list(map(lambda x: x**2, nums))
print(squared)
# Output: [1, 4, 9, 16]
```

### `filter()`
The `filter()` function returns elements from an iterable for which the function evaluates to `True`.

```python
nums = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)
# Output: [2, 4, 6]
```

### `reduce()`
The `reduce()` function (from `functools`) reduces an iterable to a single value by repeatedly applying the function.

```python
from functools import reduce

nums = [1, 2, 3, 4]
product = reduce(lambda x, y: x * y, nums)
print(product)  # Output: 24

total = reduce(lambda x, y: x + y, nums)
print(total)  # Output: 10
```

It's partially correct to assume that **list comprehensions** can replace `map()` and `filter()` in most cases. However, there are nuanced differences between these approaches, and the same assumption doesn't hold for `reduce()`.

Let’s break it down:

---

### What about List Comprehension?

#### `map()`

**List comprehension** is often preferred over `map()` because it is more readable and Pythonic. However, `map()` may be more concise when:

- You’re applying a pre-defined function.
- You’re working with functions that can directly operate on the iterable.

**Example**: Doubling numbers

```python
# Using map
nums = [1, 2, 3]
doubled_map = list(map(lambda x: x * 2, nums))  # Uses a lambda
print(doubled_map)  # Output: [2, 4, 6]

# Using list comprehension
doubled_comp = [x * 2 for x in nums]
print(doubled_comp)  # Output: [2, 4, 6]
```

We can use `map()` when applying an *already defined function*:

  ```python
  def square(x):
      return x**2

  # Using map
  squared_map = list(map(square, nums))

  # Equivalent list comprehension
  squared_comp = [square(x) for x in nums]
  ```

  In this case, `map()` and list comprehension are equally valid.

---

#### `filter()`

Similarly, **list comprehension** is often preferred over `filter()` because it is more intuitive and easier to read.

**Example**: Filtering even numbers

```python
# Using filter
nums = [1, 2, 3, 4]
evens_filter = list(filter(lambda x: x % 2 == 0, nums))
print(evens_filter)  # Output: [2, 4]

# Using list comprehension
evens_comp = [x for x in nums if x % 2 == 0]
print(evens_comp)  # Output: [2, 4]
```

Like `map()`, `filter()` it’s useful when applying a pre-defined function:

```python
def is_even(x):
    return x % 2 == 0

# Using filter
evens_filter = list(filter(is_even, nums))

# Equivalent list comprehension
evens_comp = [x for x in nums if is_even(x)]
```

Again, both approaches are valid, and readability determines the choice.

---

#### `reduce()`

`reduce()` is fundamentally different because it is used for aggregating values from an iterable into a *single result*, not transforming or filtering elements.

There’s no direct equivalent to `reduce()` with list comprehension. To replicate its functionality, you would need a manual loop or another approach.

**Example**: Compute the product of a list of numbers

```python
from functools import reduce

nums = [1, 2, 3, 4]

# Using reduce
product_reduce = reduce(lambda x, y: x * y, nums)
print(product_reduce)  # Output: 24

# Using a manual loop
product_manual = 1
for num in nums:
    product_manual *= num
print(product_manual)  # Output: 24
```

For cases like this, `reduce()` provides a concise and functional approach, while a loop may be more readable for beginners.

---

#### Performance Considerations

- **`map()` and `filter()`** are generally **faster** than list comprehensions because they are implemented in C and avoid the overhead of Python loops.
- **List comprehensions** provide more **flexibility** and better readability for Python developers.
- If performance is critical, consider benchmarking before deciding.

---

#### Readability and Code Style

- **Use list comprehensions** when the operation is simple and fits naturally into the comprehension format.
- **Use `map()` or `filter()`** when you’re applying a pre-existing function to an iterable.

For example:

```python
# List comprehension can become unwieldy for complex transformations
result = [transform(x) for x in iterable if condition(x)]

# Readability is improved with map/filter
filtered = filter(condition, iterable)
result = map(transform, filtered)
```

---

#### Conclusion

You can **often** replace `map()` and `filter()` with list comprehensions, but it’s a matter of:

- **Readability**: Which approach makes the code clearer?
- **Context**: Is the function already defined?
- **Performance**: In critical cases, `map()` and `filter()` might be slightly faster.

For `reduce()`, there is no list comprehension equivalent, so you’ll need to decide between `reduce()` or a manual loop based on readability and the complexity of the aggregation logic.

---

## 8. Best Practices

1. **Prefer Named Functions for Complex Logic**:
   If a function requires more than a single expression or becomes too long, prefer defining it using `def` for readability and maintainability.

   **Avoid**:
   ```python
   complex_lambda = lambda x: (x**2 if x % 2 == 0 else x**3) + x / 2
   ```
   **Instead**:
   ```python
   def complex_logic(x):
       if x % 2 == 0:
           return x**2 + x / 2
       else:
           return x**3 + x / 2
   ```

2. **Use Lambda for Short, Disposable Functions**:
   Use lambdas when the function is small and will only be used in one specific place.

3. **Readability Matters**:
   Lambdas should not sacrifice clarity for brevity. If the logic becomes unclear, switch to a named function.

4. **Combine with Built-in Functions**:
   Lambdas shine when used with tools like `map()`, `filter()`, and `sorted()`.

---

## 9. Common Mistakes and Misconceptions

- **Multiple Expressions**: Lambda functions cannot contain multiple statements.
  ```python
  # This will cause a syntax error
  invalid_lambda = lambda x: x + 1; print(x)
  ```
- **Overuse**: Avoid using lambdas in situations where a named function would make the code more understandable.
- **Reusability**: If you need to reuse a lambda in multiple places, define it as a named function instead.

---

## 10. Summary

Lambda functions are a powerful feature in Python, allowing you to create concise and anonymous functions. While they excel in small, localized tasks, their simplicity can sometimes limit their clarity or functionality. Use them wisely in scenarios like custom sorting, one-time operations, or higher-order function arguments for optimal effectiveness.

By understanding their strengths and limitations, you can harness the full potential of lambda functions to write cleaner and more efficient Python code.