export function useEvent() {
  const action = ({
    when,
    key,
    value,
  }: {
    when: string;
    key: string;
    value: string;
  }) => {};

  return { action };
}
