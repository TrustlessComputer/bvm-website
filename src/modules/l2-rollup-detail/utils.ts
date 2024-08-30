export const formatAiSummary = (text: string) => {
  return text
    .replaceAll('**Assets Held:**', '')
    .replaceAll('**Address Analysis**', '')
    .replaceAll('**Portfolio Composition:**', '')
    .replaceAll('**DeFi Engagement:**', '')
    .replaceAll('**Transaction History:**', '')
    .replaceAll('**Additional Insights:**', '');
};
