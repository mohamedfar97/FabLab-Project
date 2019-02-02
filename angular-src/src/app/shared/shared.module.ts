import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CapitalizeRolePipe } from '../services/pipes/capitalize-role.pipe';
import { FirstNamePipe } from '../services/pipes/first-name.pipe';
import { SizePipePipe } from '../services/pipes/size-pipe.pipe';
import { ContentPeekPipe } from '../services/pipes/content-peek.pipe';

@NgModule({
    declarations:[
        FirstNamePipe,
        CapitalizeRolePipe,
        SizePipePipe,
        ContentPeekPipe
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FirstNamePipe,
        CapitalizeRolePipe,
        SizePipePipe,
        ContentPeekPipe
    ]
})
export class SharedModule {}