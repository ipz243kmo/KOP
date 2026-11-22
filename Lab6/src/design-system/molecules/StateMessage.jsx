
import { Card } from '../atoms/Card';
import { Spinner } from '../atoms/Spinner';
import { Button } from '../atoms/Button';
import './StateMessage.css';

export function StateMessage({
  type = 'empty', 
  title,
  description,
  actionLabel,
  onAction,
}) {
  return (
    <Card
      as="section"
      variant={type === 'error' ? 'danger' : 'default'}
      className="ds-state-msg"
    >
      {type === 'loading' && <Spinner size="md" />}
      {title && <h3 className="ds-state-msg__title">{title}</h3>}
      {description && <p className="ds-state-msg__desc">{description}</p>}
      {actionLabel && onAction && (
        <Button variant="secondary" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}