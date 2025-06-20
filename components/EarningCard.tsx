// Update colors to use ColorValue type
import { ColorValue } from 'react-native';

// Update gradient colors
const gradientColors: readonly [ColorValue, ColorValue] = [colors.gradientPrimary[0] as ColorValue, colors.gradientPrimary[1] as ColorValue];

// In the component:
<LinearGradient
  colors={gradientColors}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.container}
>
// Rest of the component remains the same but replace XYZ with $PVS