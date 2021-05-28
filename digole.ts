/** Extension for Digole LCD 
 * for Calliope mini and Microbit
 * CC by SA
 * 28.05.2021 by Michael Klein
 * https://twitter.com/kleinswelt
 */

declare const enum LCD_FONT {
    //% block="4x6"
    six = 6,
    //% block="6x10"
    ten = 10,
    //% block="9x18b"
    eighteen= 18,
    //% block="OSR18"
    fiftyone = 51,
    //% block="grd20"
    htwenty = 120
}

declare const enum LCD_COLOR {
    //% block="White"
    White = 255,
    //% block="Black"
    Black = 0,
    //% block="Blue"
    Blue = 3,
    //% block="Red"
    Red = 224,
    //% block="Magenta"
    Magenta = 195,
    //% block="Green"
    Green = 12,
    //% block="Cyan"
    Cyan = 31,
    //% block="Yellow"
    Yellow = 252,
    //% block="Brown"
    Brown = 72,
    //% block="Grey"
    Grey = 46 // 50 shades
}

//% weight=100 color=#436eee icon="\uf108"
namespace digole {
    let LCD_WIDTH = 160
    let LCD_HEIGHT = 128

    let buf2 = pins.createBuffer(2);
    let buf3 = pins.createBuffer(3);
    let buf4 = pins.createBuffer(4);

    /**
     * Converts the color name to a number
     */
    //% blockId=LcdColor block="%c"
    export function LcdColor(c: LCD_COLOR): number {
        return c;
    }
 

    /**
     * Clears the lcd screen with background color
     */
    //% block="Clear Lcd Screen"
    export function ClearScreen(): void {
        buf2.setNumber(NumberFormat.UInt8LE, 0, 27)
        buf2.setNumber(NumberFormat.UInt8LE, 1, 28)
        serial.writeBuffer(buf2)
 }

    //% block="Setfont %font"
    export function SetFont(font: LCD_FONT): void {
        buf3.setNumber(NumberFormat.UInt8LE, 0, 27)
        buf3.setNumber(NumberFormat.UInt8LE, 1, 10)
        buf3.setNumber(NumberFormat.UInt8LE, 2, font)
        serial.writeBuffer(buf3)
    }

    /**
     * Sets textcurser in rows and columns
     */
   //% block="Set textposition columns %x | rows %y"
    export function SetTextposition(x: number, y:number): void {
        buf4.setNumber(NumberFormat.UInt8LE, 0, 27)
        buf4.setNumber(NumberFormat.UInt8LE, 1, 24) //TP
        buf4.setNumber(NumberFormat.UInt8LE, 2, x)
        buf4.setNumber(NumberFormat.UInt8LE, 3, y)
        serial.writeBuffer(buf4)
    }

   /**
     * Sets textcurser in Pixels
     */
   //% block="Set textposition xpixel %x | ypixel %y"
    export function SetTextpositionP(x: number, y:number): void {
        buf4.setNumber(NumberFormat.UInt8LE, 0, 27)
        buf4.setNumber(NumberFormat.UInt8LE, 1, 3) //ETP
        buf4.setNumber(NumberFormat.UInt8LE, 2, x)
        buf4.setNumber(NumberFormat.UInt8LE, 3, y)
        serial.writeBuffer(buf4)
    }

  //% block="Setcolor %color"
    export function SetColor(color: LCD_COLOR): void {
        buf3.setNumber(NumberFormat.UInt8LE, 0, 27)
        buf3.setNumber(NumberFormat.UInt8LE, 1, 7) //SC
        buf3.setNumber(NumberFormat.UInt8LE, 2, color)
        serial.writeBuffer(buf3)
    }

    //% block="Draw Line|Xstart %Xstart|Ystart %Ystart|Xend %Xend|Yend %Yend"
    //% Xstart.min=1 Xstart.max=LCD_WIDTH Ystart.min=1 Ystart.max=LCD_HEIGHT
    //% Xend.min=1 Xend.max=LCD_WIDTH Yend.min=1 Yend.max=LCD_HEIGHT
    //% inlineInputMode=inline
    export function DrawLine(Xstart: number, Ystart: number, Xend: number, Yend: number): void {
        buf2.setNumber(NumberFormat.UInt8LE, 0, 27)
        buf2.setNumber(NumberFormat.UInt8LE, 1, 16)
        serial.writeBuffer(buf2)
        buf4.setNumber(NumberFormat.UInt8LE, 0, Xstart)
        buf4.setNumber(NumberFormat.UInt8LE, 1, Ystart)
        buf4.setNumber(NumberFormat.UInt8LE, 2, Xend)
        buf4.setNumber(NumberFormat.UInt8LE, 3, Yend)
        serial.writeBuffer(buf4)
    }

    //% block="Draw Pixel|X %X_Start|Y %Y_Start"
    //% XStart.min=1 XStart.max=LCD_WIDTH YStart.min=1 YStart.max=LCD_HEIGHT
    //% inlineInputMode=inline
    export function DrawPixel(XStart: number, YStart: number): void {
        buf4.setNumber(NumberFormat.UInt8LE, 0, 27)
        buf4.setNumber(NumberFormat.UInt8LE, 1, 20)
        buf4.setNumber(NumberFormat.UInt8LE, 2, XStart)
        buf4.setNumber(NumberFormat.UInt8LE, 3, YStart)
        serial.writeBuffer(buf4)
    }

    //% block="Write String %ch +LF"
    export function DisStringLF(ch: string): void {
        buf2.setNumber(NumberFormat.UInt8LE, 0, 27)
        buf2.setNumber(NumberFormat.UInt8LE, 1, 1)
        serial.writeBuffer(buf2)
        serial.writeLine(ch);
    }

   //% block="Write String %ch"
    export function DisString(ch: string): void {
        buf2.setNumber(NumberFormat.UInt8LE, 0, 27)
        buf2.setNumber(NumberFormat.UInt8LE, 1, 1)
        serial.writeBuffer(buf2)
        serial.writeString(ch);
    }
}