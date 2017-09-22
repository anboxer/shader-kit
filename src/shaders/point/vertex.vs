attribute vec4 pPosition;
attribute vec4 a_Color;
varying vec4 v_Color;
void main(){
    gl_Position = pPosition;
    gl_PointSize = 1.0;
    v_Color=a_Color;
}