import { component$ } from '@builder.io/qwik';
import type { DocumentHead} from '@builder.io/qwik-city';
import { routeLoader$ } from '@builder.io/qwik-city';
import db from '~/db/db';
import { product } from '~/db/schema';

export const useStaffPicksLoader = routeLoader$(async () => {
  return await db.select().from(product);
})

export default component$(() => {
  const staffPicksLoader = useStaffPicksLoader();

  return (
    <div>
      <h2>Staff picks</h2>
      {staffPicksLoader.value.map(staffPick => (
        <div key={staffPick.id}>{staffPick.name}</div>
      ))}
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Welcome to Qwik',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};
