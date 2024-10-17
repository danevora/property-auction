"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Progress } from "@/components/ui/progress"
import { properties } from "@/data/properties"
import { calculateScore } from "@/utils/gameLogic"

export default function PropertyAuctionGame() {
  const [gameState, setGameState] = useState<"start" | "playing" | "gameOver">(
    "start"
  )
  const [currentRound, setCurrentRound] = useState(0)
  const [userGuess, setUserGuess] = useState("")
  const [totalScore, setTotalScore] = useState(0)
  const [roundScore, setRoundScore] = useState<number | null>(null)

  const currentProperty = properties[currentRound]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const guess = parseFloat(userGuess)
    if (isNaN(guess)) return

    const score = calculateScore(guess, currentProperty.price)
    setRoundScore(score)
    setTotalScore(totalScore + score)

    if (currentRound === 9) {
      setGameState("gameOver")
    } else {
      setTimeout(() => {
        setCurrentRound(currentRound + 1)
        setUserGuess("")
        setRoundScore(null)
      }, 3000)
    }
  }

  const startGame = () => {
    setGameState("playing")
    setCurrentRound(0)
    setUserGuess("")
    setTotalScore(0)
    setRoundScore(null)
  }

  const restartGame = () => {
    setGameState("start")
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Property Auction Game</CardTitle>
      </CardHeader>
      <CardContent>
        {gameState === "start" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">
              Welcome to Property Auction Game!
            </h2>
            <p className="mb-4">
              Guess the prices of properties around the world and earn points
              for accuracy.
            </p>
            <Button onClick={startGame} className="mt-4">
              Start Game
            </Button>
          </div>
        )}
        {gameState === "playing" && (
          <>
            <div className="mb-4">
              <Progress value={(currentRound + 1) * 10} className="w-full" />
              <p className="text-center mt-2">Round {currentRound + 1} of 10</p>
            </div>
            <h2 className="text-xl font-semibold mb-2">
              {currentProperty.address}
            </h2>
            <Carousel className="w-full max-w-xl mx-auto">
              <CarouselContent>
                {currentProperty.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <img
                      src={image}
                      alt={`Property ${index + 1}`}
                      className="w-full h-64 object-cover rounded-md"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
            <form onSubmit={handleSubmit} className="mt-4">
              <div className="flex items-center space-x-2">
                <Input
                  type="number"
                  placeholder="Enter your price guess"
                  value={userGuess}
                  onChange={(e) => setUserGuess(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit">Submit Guess</Button>
              </div>
            </form>
            {roundScore !== null && (
              <div className="mt-4 text-center">
                <p className="text-lg font-semibold">
                  Round Score: {roundScore}
                </p>
                <p className="text-sm">
                  Actual Price: ${currentProperty.price.toLocaleString()}
                </p>
              </div>
            )}
          </>
        )}
        {gameState === "gameOver" && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <p className="text-xl">Your Total Score: {totalScore}</p>
            <Button onClick={restartGame} className="mt-4">
              Play Again
            </Button>
          </div>
        )}
      </CardContent>
      {gameState !== "start" && (
        <CardFooter>
          <p className="text-lg font-semibold">Total Score: {totalScore}</p>
        </CardFooter>
      )}
    </Card>
  )
}
