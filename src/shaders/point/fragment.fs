precision mediump float;
varying vec4 v_Color;
void main() {
    gl_FragColor = vec4(abs(v_Color[0]),abs(v_Color[1]),v_Color[2],0.5);
}