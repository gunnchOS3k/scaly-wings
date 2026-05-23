# UML Sequence Diagrams — Scaly Wings

## 1. Starting a game

```mermaid
sequenceDiagram
    actor User
    participant Arcade
    participant Router
    participant GameScreen
    participant Engine

    User->>Arcade: Tap game card
    Arcade->>Router: push(/games/flutter-flight)
    Router->>GameScreen: mount
    GameScreen->>Engine: createInitialState()
    Engine-->>GameScreen: phase=start
    User->>GameScreen: Tap / Space
    GameScreen->>Engine: startGame()
    Engine-->>GameScreen: phase=playing
```

## 2. Flutter Flight game loop

```mermaid
sequenceDiagram
    participant Loop
    participant Engine
    participant Screen
    participant Storage

    loop Every frame
        Loop->>Engine: tick(state)
        Engine-->>Screen: new positions / score
    end
    User->>Screen: flap
    Screen->>Engine: flap(state)
    Engine-->>Screen: updated velocity
    Note over Engine: collision → gameover
    Screen->>Storage: saveScore(high)
```

## 3. Larva Leaf Race match

```mermaid
sequenceDiagram
    actor P1
    actor P2
    participant Screen
    participant Engine

    P1->>Screen: WASD / pad
    Screen->>Engine: moveP1()
    P2->>Screen: Arrows / pad
    Screen->>Engine: moveP2()
    loop Each second
        Screen->>Engine: tickTimer(1)
    end
    Engine-->>Screen: phase=finished, winner
```

## 4. Pupa Math Boost correct answer

```mermaid
sequenceDiagram
    actor User
    participant Screen
    participant Engine
    participant MathProblem

    User->>Screen: Submit answer
    Screen->>Engine: submitAnswer(text)
    Engine->>MathProblem: compare answer
    MathProblem-->>Engine: correct
    Engine-->>Screen: progress +=, multiplier +=
    Screen->>Screen: update ProgressMetamorphosis
```

## 5. Saving and loading high score

```mermaid
sequenceDiagram
    participant GameScreen
    participant Storage
    participant AsyncStorage

    GameScreen->>Storage: loadScore(key)
    Storage->>AsyncStorage: getItem
    AsyncStorage-->>Storage: value
    Storage-->>GameScreen: high score
    GameScreen->>Storage: saveScore(key, score)
    Storage->>AsyncStorage: setItem
```

## 6. Recruiter viewing portfolio

```mermaid
sequenceDiagram
    actor Recruiter
    participant Home
    participant About
    participant Portfolio
    participant Data

    Recruiter->>Home: Open app / web
    Recruiter->>About: About Yasmine
    About->>Data: yasmineProfile.ts
    Data-->>About: sections, bullets
    Recruiter->>Portfolio: Portfolio
    Portfolio->>Data: portfolioProjects.ts
    Data-->>Portfolio: ProjectCard list
```

## 7. Player spins in Butterfly Chance Garden

```mermaid
sequenceDiagram
    actor Player
    participant Screen
    participant Engine
    participant Dashboard

    Player->>Screen: Tap Spin
    Screen->>Engine: spinOnce(state)
    Engine-->>Screen: SpinOutcome + tokens
    Screen->>Dashboard: update empirical mean/variance
```

## 8. Chance Garden computes expected value

```mermaid
sequenceDiagram
    participant Engine
    participant Dashboard

    Engine->>Engine: expectedValuePerSpin()
    Engine-->>Dashboard: theoretical EV
    Engine->>Engine: simulateBatch(1000)
    Engine-->>Dashboard: empirical mean
```

## 9. Noise Nectar generates true state and noisy observation

```mermaid
sequenceDiagram
    participant Engine
    participant Screen

    Engine->>Engine: sample X, N
    Engine->>Engine: Y = X + N
    Engine-->>Screen: NoisySample
```

## 10. MMSE helper estimates hidden nectar

```mermaid
sequenceDiagram
    participant Screen
    participant MMSE
    participant Engine

    Screen->>MMSE: mmseEstimate(Y, variances)
    MMSE-->>Engine: X_hat
    Engine-->>Screen: error, squaredError, runningMSE
```

## 11. Poisson Pond schedules obstacle arrivals

```mermaid
sequenceDiagram
    participant Engine
    participant ArrivalProcess

    Engine->>ArrivalProcess: scheduleArrivals(lane, lambda, T)
    ArrivalProcess-->>Engine: exponential inter-arrivals
    Engine-->>Engine: place obstacles on lanes
```

## 12. Simulation mode runs many crossings

```mermaid
sequenceDiagram
    actor Player
    participant Screen
    participant Engine

    Player->>Screen: Simulate 100 crossings
    loop 100 trials
        Screen->>Engine: trial crossing
    end
    Engine-->>Screen: SimulationResult success rate
```

## 13. Controller connects and assigns Player 1

```mermaid
sequenceDiagram
    actor User
    participant Cocoon
    participant InputManager
    participant GamepadAPI

    User->>Cocoon: Assign gamepad 0 to P1
    Cocoon->>InputManager: assignGamepadToPlayer(1, 0)
    InputManager->>GamepadAPI: listConnected()
    GamepadAPI-->>InputManager: DualSense detected
```

## 14. Pinball flipper via controller

```mermaid
sequenceDiagram
    participant Gamepad
    participant InputManager
    participant PinballEngine

    Gamepad->>InputManager: L1 pressed
    InputManager-->>PinballEngine: leftFlipper=true
    PinballEngine->>PinballEngine: collideFlipper(ball)
```

## 15. Wing Run game loop

```mermaid
sequenceDiagram
    participant Loop
    participant InputManager
    participant Engine
    participant Camera

    Loop->>InputManager: getState(1)
    InputManager-->>Engine: moveRight, jump
    Engine->>Engine: applyInput + tick
    Engine->>Camera: followCamera(player.x)
```

## 16. Cocoon Console setup

```mermaid
sequenceDiagram
    actor User
    participant CocoonScreen
    participant Router

    User->>CocoonScreen: Select Big Screen Mode
    CocoonScreen-->>User: HDMI/mirror instructions
    User->>Router: Open Wing Run
```

## 17. Local multiplayer assignment

```mermaid
sequenceDiagram
    actor Host
    participant Cocoon
    participant LarvaRace

    Host->>Cocoon: P1=gamepad0, P2=gamepad1
    Host->>LarvaRace: Start race
    LarvaRace->>LarvaRace: moveP1 from input P1
    LarvaRace->>LarvaRace: moveP2 from input P2
```

## 18. Big Screen launch flow

```mermaid
sequenceDiagram
    actor User
    participant OS
    participant ScalyWings

    User->>OS: Connect HDMI / AirPlay
    OS-->>User: External display active
    User->>ScalyWings: Landscape + Pinball
    ScalyWings-->>User: Controller + touch backup
```
