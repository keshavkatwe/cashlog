export const getSentenceCase = (str: string) => {
  if (!str) {
    return '';
  }

  const trimmedStr = str.trim();
  if (trimmedStr.length === 0) {
    return '';
  }

  const firstChar = trimmedStr.charAt(0).toUpperCase();
  const restOfString = trimmedStr.slice(1).toLowerCase();

  return `${firstChar}${restOfString}`;
};
export const getGreetingByTime = (): string => {
  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    return 'Good morning';
  } else if (currentHour >= 12 && currentHour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
};

export const splitFullName = (name: string) => {
  const nameParts = name.trim().split(' ');

  const firstName = nameParts[0] || '';
  const lastName =
    nameParts.length > 1 ? nameParts[nameParts.length - 1] || '' : '';

  return {
    firstName,
    lastName,
  };
};
