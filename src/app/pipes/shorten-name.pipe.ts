import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'shortenname'
})
export class ShortenNamePipe implements PipeTransform {
    transform(value: string, maxLength: number = 10): string {
        console.log("tutaj tuatj shorten")
        if(value.length <= maxLength) {
            return value;
        }
        return value.substring(0, maxLength) + '...';
    }
}