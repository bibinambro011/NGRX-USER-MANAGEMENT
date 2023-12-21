import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { emptyaction, showalert } from "./app.action";
import { exhaustMap, map } from "rxjs";

@Injectable()
export class AppEffects {
    constructor(private $action: Actions, private snackbar: MatSnackBar) {}
  
  showalert=createEffect(()=>
  this.$action.pipe(
    ofType(showalert),
    exhaustMap((action) => {
        return this.Showsnackbaralert(action.message, action.resulttype).afterDismissed().pipe(
            map(() => {
                return emptyaction();
            })
        )
    })
)
)

  Showsnackbaralert(message:string,resulttype:string){
    let _class=resulttype=='pass'?'green-snackbar':'red-snackbar'
    return this.snackbar.open(message,'OK',{
      verticalPosition:'top',
      duration:5000,
      panelClass:[_class]
    })
  }
}
