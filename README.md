# Wings

# Table of Contents
- [Inspiration](#inspiration)
- [Features](#features)
  - [Incremental flight](#incremental-flight)
  - [Ajdustable parameters](#ajdustable-parameters)
  - [Perching](#perching)
  - [Procedural poles and wires](#procedural-poles-and-wires)
- [Implementation](#implementation)

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
## Accelration grid
## Perching
## Procedural poles and wires
