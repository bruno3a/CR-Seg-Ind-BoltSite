export const extractIndustries = (instructions: string): string[] => {
  const industriesMatch = instructions.match(/<industries>([\s\S]*?)<\/industries>/);
  if (!industriesMatch) {
    return [];
  }
  const industriesText = industriesMatch[1];
  const industries = industriesText
    .split('\n')
    .map((industry) => industry.trim())
    .filter((industry) => industry !== '');
  return industries;
};

export const getRandomIndustries = (industries: string[], count: number): string[] => {
    const shuffled = [...industries].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
