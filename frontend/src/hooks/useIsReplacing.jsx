// import { useMemo } from 'react';

// export function useIsReplacing(originalSlotToCard, currentSlot, currentCardId) {
//   const replacedCardId = originalSlotToCard[currentSlot];

//   const isReplaced = useMemo(() => {
//     return replacedCardId !== currentCardId;
//   }, [replacedCardId, currentCardId]);

//   return {
//     isReplaced,
//     replacedCardId,
//   };
// }