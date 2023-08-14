export function generateAccNum() {
  const characters = "0123456789"
  let accountNum = ""
  for(let i = 0; i < 14; i++) {
    let randomNum = Math.floor(Math.random()*characters.length);
    accountNum += characters.charAt(randomNum)
  }
  return accountNum
}