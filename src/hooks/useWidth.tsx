
import { Theme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

export const useWidth = (): number => {
  
  const above1600 = useMediaQuery((theme: Theme) => theme.breakpoints.up(1600)); // 6
  const between14001600 = useMediaQuery((theme: Theme) => theme.breakpoints.between(1400, 1600)); //5
  const between12001400 = useMediaQuery((theme: Theme) => theme.breakpoints.between(1200, 1400)); // 4
  const between9761200 = useMediaQuery((theme: Theme) => theme.breakpoints.between(976, 1200)); // 3
  const between760976 = useMediaQuery((theme: Theme) => theme.breakpoints.between(760, 976)); // 2
  const between600760 = useMediaQuery((theme: Theme) => theme.breakpoints.between(600, 760)); // 1
  const between490600 = useMediaQuery((theme: Theme) => theme.breakpoints.between(490, 600)); // 2
  // const below490 = useMediaQuery((theme: Theme) => theme.breakpoints.down(490)); // 1

  if (above1600) {
    return 6;
  }
  if (between14001600) {
    return 5
  }
  if (between12001400) {
    return 4
  }
  if (between9761200) {
    return 3
  }
  if (between760976) {
    return 2
  }
  if (between600760) {
    return 1
  }
  if (between490600) {
    return 2
  }
  return 1
}