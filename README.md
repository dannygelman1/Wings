# Wings

# Table of Contents
- [Inspiration](#inspiration)
- [Features](#features)
  - [Incremental flight](#incremental-flight)
  - [Ajdustable parameters](#ajdustable-parameters)
  - [Perching](#perching)
  - [Procedural poles and wires](#procedural-poles-and-wires)
- [Implementation](#implementation)
  - [Overview](#overview)
  - [Accelration grid](#accelration-grid)
  - [Perching](#perching)
  - [Procedural poles and wires](#procedural-poles-and-wires)

# Inspiration
I got inspired to make this after playing Wingspan, the boardgame, with friends. I love the art in the game, and love learning about birds from the really fun bird facts on the cards. I learned about the boids simulation from my computer graphics class in college, but never implemented it. Playing wingspan, was just the inspiration I was missing. This implementation is based on this [article](https://people.ece.cornell.edu/land/courses/ece4760/labs/s2021/Boids/Boids.html).

# Features
Here is a highlight of the main elements to the simulation.
## Incremental flight
When you first visit the experience, you will see that the birds start off perched, and then one by one begin to fly. I did this to give the simulation a more natural feeling.

https://github.com/dannygelman1/Wings/assets/45411340/e5dbabaa-ca43-40bd-b244-434d750433bd

## Ajdustable parameters
You can control various elements of the simulation with sliders.

https://github.com/dannygelman1/Wings/assets/45411340/1387a42d-751f-4109-8ba8-7fad5e33c3e9

## Perching
I added an extension to my simulation where birds perch during a time interval, but you can also force all the birds to perch with a button.

https://github.com/dannygelman1/Wings/assets/45411340/d2761cf5-913e-4d29-86b4-48132bbf9f08

## Procedural poles and wires
The last extension I worked on was procedurally generated poles and wires. These also determine the starting location of all the birds.

https://github.com/dannygelman1/Wings/assets/45411340/999aecea-6180-46f8-8755-7345ac9a0d41

# Implementation
## Overview
There are three main principles in the boids algorothim - cohesion, separation, alighnment

- `cohesion` - how much the birds move towards the center of the flock
  -  this is controlled by a `centering factor` (how strongly they move to center)
- `separation` - how much the birds move away from eachother
  - this is controlled by an `avoid factor` (how strongly they move away) and `protected range` (the radius around them that encompasses birds to avoid)
- `alighnment` - how much the birds move in the direction of the flock
  - this is controlled by a `matching factor` (how strongly they move together) and `visual range` (the radius around them that encompasses birds to follow)

This simulation was made with React-Three-Fiber and slightly more complex because it was in 3D instead of 2D.
## Accelration grid
I implemented an acceleration grid to make the simulation run at a reasonable frame rate. A big part of this simulation involved comparing the distance of every bird to every other bird at every time step. This quickly becomes very computationally intense. 

To avoid this, I only check each bird against birds in their own grid (blue) and 7 other neighboring grids(green). You can see in the diagrams below, I find which grids to check based on which corner of their own grid the bird is. 
<img width="400" alt="bird2" src="https://github.com/dannygelman1/Wings/assets/45411340/425b1938-e125-4c2c-ae1e-bd903f0eaaeb">
<img width="400" alt="grid3" src="https://github.com/dannygelman1/Wings/assets/45411340/29cb88d2-48c4-4778-9b0d-c3f814b96123">

So you can image, if the bird would instead be in a lower corner, the four grids underneath (not in diagram) would be highlighted.


## Perching
I implemented perching by assigning each bird their own starting position on the wires. Each one has a unique position, and I make sure there are no overlaps. Then the perching behaviour was just a matter of incrementing their velcoity in the direction of `currentPosition - perchLocation`. I also had two different models for the birds, one for flying and one for perching. Once the bird gets a certain distance away from its perch location, I swicth the model to the perching version.

## Procedural poles and wires
For the wires, I used the `EllipseCurve` from Three.js, and found ranges of parameters that worked to get a telephone wire appearance. Once I was happy with the wires, I used math to find the endpoints of all the wires, and those were the positions of boxes I added to the scene to act as the poles. This system is entirley procedural ao every time you refresh, or click the `generate wires` button, it will generate a new unique system of poles and wires. 
