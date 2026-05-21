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
