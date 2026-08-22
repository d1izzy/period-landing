import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Color, type Mesh, type ShaderMaterial } from "three";
import { useEffect, useMemo, useRef } from "react";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
varying vec2 vUv;
uniform float uTime;
uniform vec3 uColor;
uniform float uSpeed;
uniform float uScale;
uniform float uRotation;
uniform float uNoiseIntensity;

float noise(vec2 texCoord) {
  vec2 r = (2.71828 * sin(2.71828 * texCoord));
  return fract(r.x * r.y * (1.0 + texCoord.x));
}

vec2 rotateUvs(vec2 uv, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c) * uv;
}

void main() {
  float rnd = noise(gl_FragCoord.xy);
  vec2 uv = rotateUvs(vUv * uScale, uRotation);
  vec2 tex = uv * uScale;
  float tOffset = uSpeed * uTime;
  tex.y += 0.03 * sin(8.0 * tex.x - tOffset);
  float pattern = 0.6 + 0.4 * sin(
    5.0 * (tex.x + tex.y + cos(3.0 * tex.x + 5.0 * tex.y) + 0.02 * tOffset) +
    sin(20.0 * (tex.x + tex.y - 0.1 * tOffset))
  );
  vec4 col = vec4(uColor, 1.0) * vec4(pattern) - rnd / 15.0 * uNoiseIntensity;
  col.a = 1.0;
  gl_FragColor = col;
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  return [
    parseInt(clean.slice(0, 2), 16) / 255,
    parseInt(clean.slice(2, 4), 16) / 255,
    parseInt(clean.slice(4, 6), 16) / 255,
  ];
}

function SilkPlane({
  speed,
  scale,
  color,
  noiseIntensity,
  rotation,
}: {
  speed: number;
  scale: number;
  color: string;
  noiseIntensity: number;
  rotation: number;
}) {
  const mesh = useRef<Mesh>(null);
  const { viewport } = useThree();
  const uniforms = useMemo(
    () => ({
      uSpeed: { value: speed },
      uScale: { value: scale },
      uNoiseIntensity: { value: noiseIntensity },
      uColor: { value: new Color(...hexToRgb(color)) },
      uRotation: { value: rotation },
      uTime: { value: 0 },
    }),
    [],
  );

  useEffect(() => {
    uniforms.uSpeed.value = speed;
    uniforms.uScale.value = scale;
    uniforms.uNoiseIntensity.value = noiseIntensity;
    uniforms.uColor.value.setRGB(...hexToRgb(color));
    uniforms.uRotation.value = rotation;
  }, [speed, scale, noiseIntensity, color, rotation, uniforms]);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    mesh.current.scale.set(viewport.width, viewport.height, 1);
    const material = mesh.current.material as ShaderMaterial;
    material.uniforms.uTime.value += 0.1 * delta;
  });

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
}

export default function Silk({
  speed = 2,
  scale = 1,
  color = "#6f7378",
  noiseIntensity = 1.2,
  rotation = 0.12,
}: {
  speed?: number;
  scale?: number;
  color?: string;
  noiseIntensity?: number;
  rotation?: number;
}) {
  return (
    <Canvas
      dpr={[1, 1.6]}
      gl={{ antialias: false, alpha: false }}
      camera={{ position: [0, 0, 1] }}
      style={{ width: "100%", height: "100%" }}
    >
      <SilkPlane
        speed={speed}
        scale={scale}
        color={color}
        noiseIntensity={noiseIntensity}
        rotation={rotation}
      />
    </Canvas>
  );
}
