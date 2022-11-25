import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
selector: 'app-prenota',
templateUrl: './prenota.component.html',
styleUrls: ['./prenota.component.scss'],

})


export class PrenotaComponent {


  data : string;
  nome : string;
  cognome: string;
  tavolo: Number;
  orari: string;
  persone:string;
constructor(private authService : AuthService, private router : Router){}

addRecord(){
  let Record: any = {};
  Record['data'] = this.data;
  Record['nome'] = this.nome;
  Record['cognome'] = this.cognome;
  Record['tavolo'] = this.tavolo;
  Record['orari']= this.orari;
  Record['persone']= this.persone;
      this.authService.createNewRecord(Record).then(res =>{
      alert("Prenotazione effettuata");
      this.router.navigate(['/home']);
      console.log(res);
    }).catch(error =>{
      console.log(error);
    })
}


    public seatConfig: any = null;
    public seatmap: any = [];
    public seatChartConfig = {
      showRowsLabel: false,
      newSeatNoForRow: false
    };
    public cart: any = {
      selectedSeats: [undefined],
      seatstoStore: [undefined],
      cartId: "",
      eventId: 0
    };

    ngOnInit(): void {
   
    this.seatConfig = [
        {
          seat_map: [
            {
              seat_label: " ",
              layout: "g_____g"
            },
            {
              seat_label: " ",
              layout: "gg__ggg"
            },
            {
              seat_label: " ",
              layout: "gg___gg"
            },
            {
              seat_label: " ",
              layout: "gg___gg"
            },
            {
              seat_label: " ",
              layout: "gg___gg"
            },
            {
              seat_label: " ",
              layout: "ggg___g"
            }
          ]
        }
      ];
      this.processSeatChart(this.seatConfig);
    }

    public processSeatChart(map_data: any[]) {
        if (map_data.length > 0) {
          var seatNoCounter = 1;
          for (let __counter = 0; __counter < map_data.length; __counter++) {
            var row_label = "";
            var item_map = map_data[__counter].seat_map;
    
            
            row_label = "Row " + item_map[0].seat_label + " - ";
            if (item_map[item_map.length - 1].seat_label != " ") {
              row_label += item_map[item_map.length - 1].seat_label;
            } else {
              row_label += item_map[item_map.length - 2].seat_label;
            }
            
            
            item_map.forEach((map_element:any) => {
              var mapObj: any = {
                seatRowLabel: map_element.seat_label,
                seats: []
              };
              row_label = "";
              var seatValArr = map_element.layout.split("");
              if (this.seatChartConfig.newSeatNoForRow) {
                seatNoCounter = 1; 
              }
              seatValArr.forEach((item:any) => {
                var seatObj: any= {
                  key: map_element.seat_label + "_",
                  status: "available"
                };
    
                if (item != "_") {
                  seatObj["seatLabel"] =
                    map_element.seat_label + " " + seatNoCounter;
                  if (seatNoCounter < 10) {
                    seatObj["seatNo"] = "0" + seatNoCounter;
                  } else {
                    seatObj["seatNo"] = "" + seatNoCounter;
                  }
    
                  seatNoCounter++;
                } else {
                  seatObj["seatLabel"] = "";
                }
                mapObj["seats"].push(seatObj);
              });
              console.log(" \n\n\n Seat Objects ", mapObj);
              this.seatmap.push(mapObj);
            });
          }
        }
      }
     
      public selectSeat(seatObject: any) {
        console.log("Seat to block: ", seatObject);
        if (seatObject.status == "available") {
          seatObject.status = "booked";
          this.cart.selectedSeats.push(seatObject.seatLabel);
          this.cart.seatstoStore.push(seatObject.key);
        } else if ((seatObject.status = "booked")) {
          seatObject.status = "available";
          var seatIndex = this.cart.selectedSeats.indexOf(seatObject.seatLabel);
          if (seatIndex > -1) {
            this.cart.selectedSeats.splice(seatIndex, 1);
            this.cart.seatstoStore.splice(seatIndex, 1);
          }
        }
        this.tavolo = 0;
        this.tavolo= this.tavolo + this.cart.selectedSeats ;
      }
    
//       public blockSeats(seatsToBlock: string) {
//         if (seatsToBlock != "") {
//           var seatsToBlockArr = seatsToBlock.split(",");
//           for (let index = 0; index < seatsToBlockArr.length; index++) {
//             var seat = seatsToBlockArr[index] + "";
//             var seatSplitArr = seat.split("_");
//             console.log("Split seat: ", seatSplitArr);
//             for (let index2 = 0; index2 < this.seatmap.length; index2++) {
//               const element = this.seatmap[index2];
//               if (element.seatRowLabel == seatSplitArr[0]) {
//                 var seatObj = element.seats[parseInt(seatSplitArr[1]) - 1];
//                 if (seatObj) {
//                   console.log("\n\n\nFount Seat to block: ", seatObj);
//                   seatObj["status"] = "unavailable";
//                   this.seatmap[index2]["seats"][
//                     parseInt(seatSplitArr[1]) - 1
//                   ] = seatObj;
//                   console.log("\n\n\nSeat Obj", seatObj);
//                   console.log(
//                     this.seatmap[index2]["seats"][parseInt(seatSplitArr[1]) - 1]
//                   );
//                   break;
//                 }
//               }
//             }
//           }
//         }
//       }
      
  }