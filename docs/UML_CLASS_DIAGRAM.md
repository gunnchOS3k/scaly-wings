# UML Class Diagram — Scaly Wings

```mermaid
classDiagram
    class App {
        +navigate(route)
        +renderHome()
    }

    class Game {
        <<abstract>>
        +phase: string
        +start()
        +tick()
        +reset()
    }

    class FlutterFlightEngine {
        +butterfly: Butterfly
        +gates: Gate[]
        +score: number
        +flap()
        +tick()
    }

    class LarvaLeafRaceEngine {
        +grid: LeafGrid
        +larva1: Larva
        +larva2: Larva
        +timeLeft: number
        +moveP1()
        +moveP2()
    }

    class PupaMathBoostEngine {
        +progress: number
        +multiplier: number
        +submitAnswer()
    }

    class Player {
        +id: number
        +inputScheme: string
    }

    class Butterfly {
        +y: number
        +velocity: number
        +flap()
    }

    class Larva {
        +row: number
        +col: number
        +eaten: number
        +move()
    }

    class LeafGrid {
        +cols: number
        +rows: number
        +eaten: boolean[][]
        +markEaten()
        +percentEaten()
    }

    class Gate {
        +x: number
        +gapY: number
        +passed: boolean
    }

    class MathProblem {
        +id: string
        +prompt: string
        +answer: number
        +difficulty: string
    }

    class ScoreManager {
        +load(key)
        +save(key, value)
    }

    class PortfolioProfile {
        +name: string
        +sections: object
    }

    class ProjectCard {
        +title: string
        +stack: string[]
        +recruiterKeywords: string[]
    }

    App --> Game
    Game <|-- FlutterFlightEngine
    Game <|-- LarvaLeafRaceEngine
    Game <|-- PupaMathBoostEngine
    FlutterFlightEngine --> Butterfly
    FlutterFlightEngine --> Gate
    LarvaLeafRaceEngine --> Larva
    LarvaLeafRaceEngine --> LeafGrid
    Larva --> Player
    PupaMathBoostEngine --> MathProblem
    App --> ScoreManager
    App --> PortfolioProfile
    PortfolioProfile --> ProjectCard
```
