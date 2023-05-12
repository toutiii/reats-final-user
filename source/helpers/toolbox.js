import { format } from "date-fns";
import frFrLocale from 'date-fns/locale/fr';


export function getDeliveryDateInfo(dateObject, wantedFormat) {
    formattedDeliveryDate = format(
        dateObject,
        wantedFormat,
        { locale: frFrLocale }
    )
    return formattedDeliveryDate
}
