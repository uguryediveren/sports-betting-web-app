import { useParams } from 'react-router-dom';
import { EventDetails } from '../components/EventDetails';
import { Header } from '../components/Header';

export default function EventDetailsPage() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return <div>Event ID not found</div>;
  }

  return (
    <main className='min-h-screen bg-background'>
      <Header />
      <div className='container mx-auto px-4 py-6'>
        <EventDetails eventId={id} />
      </div>
    </main>
  );
}
