import EditMessForm from "./EditMessForm";
import { MessService } from "@/services/mess_service";

export default async function EditMessPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const { data } = await MessService.getById(id);

    return <EditMessForm mess={data} />;
}