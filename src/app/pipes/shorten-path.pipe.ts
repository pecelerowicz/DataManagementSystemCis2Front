import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shorten'
})
export class ShortenPathPipe implements PipeTransform {
    transform(value: any) {
        return value.substr(value.lastIndexOf('/') + 1);
    }
}