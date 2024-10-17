export const calculateScore = (guess: number, actualPrice: number): number => {
  const difference = Math.abs(guess - actualPrice)
  const percentageDifference = (difference / actualPrice) * 100
  const score = 1000 - Math.floor(percentageDifference * 10)
  return Math.max(0, Math.min(score, 1000))
}