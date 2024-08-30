export const formatAiSummary = (text: string) => {
  return text
    .replaceAll('**Assets Held:**', '')
    .replaceAll('**Portfolio Composition:**', '')
    .replaceAll('**DeFi Engagement:**', '')
    .replaceAll('**Transaction History:**', '');
};
