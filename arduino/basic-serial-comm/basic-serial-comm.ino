#include <LiquidCrystal.h>

LiquidCrystal lcd(12, 11, 5, 4, 3, 2);

const int BLUE_PIN = 8;
const int GREEN_PIN = 9;
const int RED_PIN = 10;

int number = 0;
int incomingByte = 0;

int RED_STATE = 0;
int BLUE_STATE = 0;
int GREEN_STATE = 0;

String inData;
String lastText;


void setup() {
  // set up the number of columns and rows on the LCD 
  Serial.begin(9600);
  lcd.begin(16, 2);
  
  // set up the switch pin as an input
  pinMode(BLUE_PIN,OUTPUT);
  pinMode(GREEN_PIN,OUTPUT);
  pinMode(RED_PIN,OUTPUT);
  
  // Print a message to the LCD.
  lcd.print("Serial LED");
  lcd.setCursor(0, 1);
  lcd.print("Communication");
  digitalWrite(BLUE_PIN,0);
  digitalWrite(GREEN_PIN,0);
  digitalWrite(RED_PIN,0);   
}

void setLCDLineOne() {
    int commandCode = Serial.read();
    //Serial.println("well I got here");
    delay(50);
    while (Serial.available() > 0)
    {
        char recieved = Serial.read();
        //Serial.println(recieved);
        if (recieved != '\n') {
          inData += recieved;
        } else {
            //Serial.print("Arduino Received: ");
            //Serial.println(inData);
            lcd.clear();
            lcd.setCursor(0,0);
            lcd.print(inData);
            lastText = inData;
            inData = ""; // Clear recieved buffer
            break;
        }
    }
}

void setPINStateCommand() {
  //Serial.println("Hmmmm");
  if (Serial.available() >= 3) {
    int commandCode = Serial.read();
    int pinNumber = Serial.read();
    int pinState = Serial.read();
    //Serial.print("Writing P#");
    //Serial.print(pinNumber);
    //Serial.print(" with Value ");
    //Serial.println(pinState);
    
    digitalWrite(pinNumber,pinState);
  }
}

void logState() {
  Serial.print("{red:");
  Serial.print(digitalRead(RED_PIN));  
  Serial.print(",blue:");
  Serial.print(digitalRead(BLUE_PIN));    
  Serial.print(",green:");
  Serial.print(digitalRead(GREEN_PIN));      
  Serial.print(",lcd:'");
  Serial.print(lastText);
  Serial.println("'}");
}

void loop() {
  if (Serial.available() > 0) {
    int commandCode = Serial.peek();
    //Serial.println(commandCode);
    switch (commandCode) {
      case 25:
        setPINStateCommand();
        logState();
        break;
      case 26:
        setLCDLineOne();
        logState();
        break;
    }
  }
}

/*
void logPINState() {
  Serial.print("LEDState:");
  Serial.print("R");
  Serial.print(RED_STATE);
  Serial.print(":");
  Serial.print("G");
  Serial.print(GREEN_STATE);
  Serial.print(":");
  Serial.print("B");
  Serial.println(BLUE_STATE);
}



void loop() {
    while (Serial.available() > 0)
    {
        char recieved = Serial.read();
        if (recieved != "\n") {
          inData += recieved; 
        } else {
            Serial.print("Arduino Received: ");
            Serial.println(inData);
            lcd.clear();
            lcd.setCursor(0,0);
            lcd.print(inData);
//            lcd.setCursor(0, 1);
//            lcd.print("Communication");            

            inData = ""; // Clear recieved buffer

        }
    }
}

void blahloop() {
 
        if (Serial.available() > 0) {
                // read the incoming byte:
                incomingByte = Serial.read();
                if (incomingByte == 82) {
                  if(RED_STATE == 0) {
                    RED_STATE = 1;
                  } else {
                    RED_STATE = 0;
                  }
                  digitalWrite(RED_PIN,RED_STATE);
                } 
                if (incomingByte == 71) {
                  if(GREEN_STATE == 0) {
                    GREEN_STATE = 1;
                  } else {
                    GREEN_STATE = 0;
                  }
                  digitalWrite(GREEN_PIN,GREEN_STATE);
                }                 
                if (incomingByte == 66) {
                  if(BLUE_STATE == 0) {
                    BLUE_STATE = 1;
                  } else {
                    BLUE_STATE = 0;
                  }
                  digitalWrite(BLUE_PIN,BLUE_STATE);
                }                 

                // say what you got:
                logPINState();
        }
}
*/

