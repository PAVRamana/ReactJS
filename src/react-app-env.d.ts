export const images = {
  success:
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTggMC41QzMuODYgMC41IDAuNSAzLjg2IDAuNSA4QzAuNSAxMi4xNCAzLjg2IDE1LjUgOCAxNS41QzEyLjE0IDE1LjUgMTUuNSAxMi4xNCAxNS41IDhDMTUuNSAzLjg2IDEyLjE0IDAuNSA4IDAuNVpNNi41IDExLjc1TDIuNzUgOEwzLjgwNzUgNi45NDI1TDYuNSA5LjYyNzVMMTIuMTkyNSAzLjkzNUwxMy4yNSA1TDYuNSAxMS43NVoiIGZpbGw9IiMwMDdBM0IiLz4KPC9zdmc+Cg=='
};


/* eslint-disable @typescript-eslint/no-explicit-any */
import { images } from './images';

const renderImage = (src: any, size: any, margin?: any) => {
  return (
    <div
      aria-hidden="true"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '1em',
        maxWidth: '1em',
        minHeight: '1em',
        maxHeight: '1em',
        fontSize: size,
        margin: margin
      }}
    >
      <img src={src} alt="" />
    </div>
  );
};

const SuccessIcon = (props: { size?: 'small' | 'medium' | 'large' }) => {
  const size = { small: 20, medium: 24, large: 36 }[props.size || 'small'];
  return <>{renderImage(images.success, size)}</>;
};

export { SuccessIcon };
