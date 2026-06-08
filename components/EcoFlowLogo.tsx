import Svg, { Path, Text } from 'react-native-svg';

type Props = {
  size?: number;
  showText?: boolean;
};

export default function EcoFlowLogo({ size = 160, showText = true }: Props) {
  const totalH = showText ? size * 1.3 : size;

  return (
    <Svg width={size} height={totalH} viewBox={`0 0 100 ${showText ? 130 : 100}`}>

      {/* Folha principal — oval alongada, inclinada ~-15° */}
      <Path
        d="M 50 10
           C 72 10, 84 30, 80 52
           C 76 72, 58 86, 44 80
           C 30 74, 24 56, 28 38
           C 32 18, 42 10, 50 10 Z"
        fill="#22C55E"
      />

      {/* Camada de profundidade — metade mais escura */}
      <Path
        d="M 50 10
           C 42 10, 32 18, 28 38
           C 24 56, 30 74, 44 80
           C 38 70, 34 52, 38 36
           C 42 20, 48 12, 50 10 Z"
        fill="#16A34A"
      />

      {/* Nervura central */}
      <Path
        d="M 50 16 C 54 36, 56 58, 50 78"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity={0.7}
      />

      {/* Nervuras laterais — 3 pares simétricos */}
      <Path d="M 51 30 C 60 28, 66 24, 68 20" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity={0.5} />
      <Path d="M 52 44 C 62 42, 70 38, 72 34" stroke="white" strokeWidth="1.4" strokeLinecap="round" fill="none" opacity={0.5} />
      <Path d="M 53 58 C 62 58, 68 55, 70 52" stroke="white" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity={0.4} />

      {/* Haste curta inclinada */}
      <Path
        d="M 50 80 C 48 88, 44 92, 42 96"
        stroke="#16A34A"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Texto EcoFlow */}
      {showText && (
        <Text
          x="50"
          y="120"
          textAnchor="middle"
          fontSize="15"
          fontWeight="700"
          fontFamily="System"
          fill="#16A34A"
          letterSpacing="1.5"
        >
          EcoFlow
        </Text>
      )}

    </Svg>
  );
}
