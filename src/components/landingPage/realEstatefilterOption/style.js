import styled from "styled-components";

export const FilterSection = styled.section`
  width: 100%;
  background: #f4f7f8;
  border-bottom: 1px solid #dbe3e6;
`;

export const FilterInner = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 1280px;
  padding: 6px 28px;
  display: flex;
  justify-content: flex-start;

  @media (min-width: 640px) {
    padding: 6px 32px;
  }

  @media (min-width: 1024px) {
    padding: 6px 110px;
  }

  @media (max-width: 640px) {
    padding: 6px 7px;
    justify-content: flex-start;
    overflow-x: auto;
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  padding: 10px;
  border-radius: 8px;
  background: transparent;
  width: fit-content;
  margin: 0;
  font-family: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
`;

export const FilterActionButton = styled.button`
  font-family: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 1px solid #d8e0e2;
  border-radius: 6px;
  background: #ffffff;
  color: #5f6c72;
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  padding: 11px 16px;
  min-height: 42px;
  cursor: pointer;
  white-space: nowrap;
  transition: background-color 0.2s ease, border-color 0.2s ease;

  &:hover {
    background: #edf3f5;
    border-color: #cfd8db;
  }
`;

export const FilterActionIcon = styled.span`
  display: inline-flex;
  width: 15px;
  height: 15px;
  color: currentColor;

  svg {
    display: block;
  }
`;

export const SegmentGroup = styled.div`
  display: inline-flex;
  align-items: center;
  background: #ffffff;
  border: 1px solid #d8e0e2;
  border-radius: 6px;
  overflow: hidden;
`;

export const SegmentButton = styled.button`
  font-family: inherit;
  border: none;
  border-right: 1px solid #d8e0e2;
  background: ${({ $active }) => ($active ? "#2f9f52" : "transparent")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#5f6c72")};
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  padding: 11px 16px;
  min-height: 42px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
  white-space: nowrap;

  &:last-child {
    border-right: none;
  }

  &:hover {
    background: ${({ $active }) => ($active ? "#2f9f52" : "#edf3f5")};
  }
`;
