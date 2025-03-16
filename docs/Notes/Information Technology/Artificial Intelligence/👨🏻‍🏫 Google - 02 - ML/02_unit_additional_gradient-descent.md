---
id: google-2-unit-addtional-1
title: 📖 Gradient Descent
---

## ➡️ **Useful Materials**

### Original Source

For a more in-depth explanation of Gradient Descent, we recommend the following video by 3Blue1Brown.

<iframe
  src="https://www.youtube.com/embed/IHZwWFHWa-w"
  title="Gradient descent, how neural networks learn | DL2"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  className="video-holidays"
>
</iframe>

### Resources and Further Study

- Michael Nielsen’s online book on neural networks and deep learning (free and publicly available) offers a detailed walkthrough with code.  
- Other resources, such as Chris Olah’s blog posts, Distill publications, and various courses, illuminate how modern deep neural networks operate internally.

## 1️⃣ **Background and Motivation**

Below is a comprehensive, step-by-step explanation of gradient descent and its role in training neural networks, drawing on all the key insights from the video transcript. It covers how a neural network is set up for digit recognition, how the cost function is defined, and how gradient descent iteratively improves the network’s parameters. It also touches on issues like local minima, memorization vs. learning, and how modern networks build upon these ideas.

### Handwritten Digit Recognition

A classic benchmark for neural networks is recognizing handwritten digits (0-9) from 28×28 grayscale images. Each pixel in this 28×28 grid has a value between 0 and 1, and these 784 pixel values form the input to the network. The basic goal is that, given a new digit image, the network outputs the correct label - i.e., the digit it represents.

### Network Architecture Recap

A typical neural network for this task has:

- An **input layer** with 784 neurons (one per pixel).
- One or more **hidden layers**, where each neuron computes a weighted sum of the previous layer’s activations plus a bias, and then applies an activation function such as the sigmoid (a “squishing” function) or ReLU (rectified linear unit).
- An **output layer** with 10 neurons - one for each possible digit (0 through 9).  
The network assigns a “brightness” or activation level to each of these 10 output neurons, and the digit corresponding to the brightest neuron is considered the predicted class.

### Parameters (Weights and Biases)

Each neuron’s behavior depends on its weights (one weight per connection to the previous layer) and a single bias. With two hidden layers of 16 neurons each, plus the input and output layers, there can be around 13,000 parameters in total. Adjusting these parameters is the crux of how the network “learns”.

## 2️⃣ **The Learning Goal: Minimizing Cost**

After randomly initializing all weights and biases, the network initially performs poorly. We need a systematic way to make it better using labeled data - images of digits plus the correct label for each digit.

### 1. Define a Cost Function

- For each training example, measure the difference between the network’s predicted output and the desired output.  
- A common choice is to sum up the squares of these differences (sometimes called a squared error).  
- If the network classifies an example correctly and with high confidence, this sum is small. If it’s wildly off, the sum is large.

### 2. Average Over the Entire Training Set

- Because tens of thousands of labeled images are available (the MNIST dataset), we typically look at the **average** cost across all those samples.  
- This average cost is a single scalar number that captures how “lousy” the current set of weights and biases is.  
- Lowering this average cost means the network is performing better across all examples, not just one.

### 3. Local Minima vs. Global Minima

- In principle, there could be many ways to adjust the weights such that the network improves. Each “valley” in the cost-function landscape corresponds to a local minimum.  
- Which local minimum the network ends up in can depend on its initial random parameter settings and the details of the training algorithm.

## 3️⃣ **The Core Algorithm: Gradient Descent**

### Key Idea

Gradient descent is the iterative process for finding which direction to shift each weight and bias so that the cost function goes down. Even though the cost function might live in a 13,000-dimensional space, the same intuition from single-variable calculus extends to higher dimensions:

1. **Compute the Gradient**  
   - The **gradient** tells you which direction in parameter-space (i.e., which combination of weight/bias adjustments) most rapidly **increases** the cost.  
   - Its negative ($-$gradient) indicates which direction decreases the cost the fastest.  
   - The size (magnitude) of each component in that gradient indicates how important a change in that particular weight/bias is relative to the others.  

2. **Take a Small Step Downhill**  
   - Update each weight and bias by a small fraction of its negative gradient component.  
   - These small steps ensure you approach a local minimum, and the step size often shrinks as you get closer (like a ball rolling into a valley, slowing down near the bottom).

3. **Repeat**  
   - You continually re-compute the new gradient at each step (because once weights change, so do the network outputs and thus the cost landscape).  
   - Keep iterating until changes no longer meaningfully reduce the cost, indicating convergence on a local minimum.

### Backpropagation

The efficient algorithm used to calculate the gradient in a neural network is known as **backpropagation**. It systematically applies the chain rule of calculus to propagate errors backward - from the output layer to each hidden layer - assigning credit (or blame) to specific weights. This way, every single weight and bias can be nudged in just the right direction to reduce the overall cost.

## 4️⃣ **Performance and Observations**

### Accuracy on New Data

Once trained, the network is tested on new images it has never seen. A typical two-hidden-layer neural network (with 16 neurons each) can reach about 96% accuracy on the MNIST test set. With a few tweaks (e.g., more layers or different hyperparameters), it can climb to around 98%. While not the absolute state-of-the-art, this still demonstrates that the learned parameters generalize beyond the training data.

### Hidden Layer Interpretations

A simple hope was that hidden neurons might each specialize in detecting something like edges or loops. However, in practice, the learned weights for these layers can look random or obscure when visualized. The network still does well at classification; it simply finds its own sometimes-unintuitive way of partitioning the input space.

### Overconfidence on Garbage Inputs

A trained network might respond confidently to random noise, predicting, for instance, a “5” when the input is purely random pixels. This happens because the network only ever sees neat, centered digit images during training. It has no reason (from the cost function’s perspective) to learn caution or produce “uncertain” outputs on unrecognizable inputs.

## 5️⃣ **Local Minima and “Memorization” in Modern DL**

### Local Minima as Valleys

When gradient descent is applied, it may settle into different local minima depending on how the network is initialized. Deep learning researchers have shown that in high-dimensional parameter spaces, many local minima might have similarly good performance on the training data.

### Structured vs. Random Labels

A striking experiment involves randomizing the labels of a training set. Remarkably, large networks can memorize these random assignments, achieving near-perfect accuracy on the training data but failing entirely on real images (where the labels are correct). This memorization highlights that neural networks often have enough capacity to overfit without actually learning useful patterns.  

- **Structured Data**  
When the labels do correspond to the right images, the cost function drops much more quickly, indicating the network is learning meaningful patterns rather than merely memorizing.

- **Memorized Data**  
With randomly shuffled labels, training still converges (the network memorizes the random labels), but the cost decreases more slowly. No actual structure from the images is learned.

### Implications

These experiments show that although neural networks can overfit to noise, they do tend to find more meaningful parameter configurations *faster* when the dataset is correctly labeled. Modern developments in deep learning build upon such insights, using regularization, data augmentation, or specialized architectures (like convolutional or recurrent networks) to detect more robust patterns and avoid memorizing noise.

## 6️⃣ **Beyond the Basics**

### Why Continuous Activations?

To make gradient descent feasible, the network’s activations must be differentiable functions of their inputs. This is why sigmoid-like or ReLU activations are used instead of purely binary on/off switches (as in some simplified biological neuron models). If neuron outputs were discrete, the cost function would not be smooth, and there would be no easy way to compute a gradient.

### Scaling Up

The approach to digit classification described here (two hidden layers, fully connected, 16 neurons each) is a small example by modern standards. Current state-of-the-art networks for image tasks often have many layers (dozens or even hundreds) and incorporate convolutional layers, pooling, skip connections, and more. Yet the same core ideas - gradient descent, backpropagation, cost functions - remain the bedrock of training.

## 7️⃣ **Conclusion**

In essence, the story of gradient descent in neural networks is a repeated calculus exercise:

1. Define a cost function that measures how well (or poorly) the network is classifying the training data.  
2. Compute the gradient - a measure of which parameter changes reduce that cost the fastest.  
3. Nudge each parameter in the negative gradient’s direction, then repeat.  

This systematic “hill descent” drives the network’s weights and biases toward configurations that effectively map handwritten digits to their correct labels. While local minima and memorization raise subtle questions, especially in very large networks, the core principle of gradient descent remains foundational for deep learning. Through careful architectural design and regularization, modern networks learn powerful representations from vast datasets, performing tasks once deemed far beyond the reach of simple layered perceptrons.
