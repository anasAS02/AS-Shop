import category from './page';

export async function generateMetadata() {
  return{
    title: category,
    description: `${category} Products | Your Description Here`,
  };
}