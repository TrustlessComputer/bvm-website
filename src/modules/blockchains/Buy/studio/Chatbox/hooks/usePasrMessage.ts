export function useParseMessage(message: string) {

 // Regular expression to match a JSON object
  const regex = /\{[^{}]*\}/;
  
  // Find the first match
  const match = message.match(regex);

  if (match) {
    const jsonStr = match[0];
    const startIdx = match.index!;
    const endIdx = startIdx + jsonStr.length;

    // Split the text into three parts
    const beforeJSON = message.substring(0, startIdx);
    const jsonPart = jsonStr;
      const afterJSON = message.substring(endIdx);
      
      console.log('____beforeJSON', [beforeJSON, jsonPart, afterJSON]);

    return [beforeJSON, jsonPart, afterJSON];
  }

  return null; // Return null if no JSON object is found


}