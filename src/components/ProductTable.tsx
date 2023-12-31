import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  FormGroup,
} from "@mui/material";
import SearchBar from "./SearchBar";
import { useState } from "react";

const COLUMNS = ["Name", "Price"];
// Add comments to test actions

interface ProductCategoryRowProps {
  category: string;
}
function ProductCategoryRow({ category }: ProductCategoryRowProps) {
  return (
    <TableRow>
      <TableCell colSpan={9999} align="center" sx={{ fontWeight: 700 }}>
        {category}
      </TableCell>
    </TableRow>
  );
}

interface ProductProps {
  category: string;
  isStocked: boolean;
  name: string;
  price: number;
}

function ProductRow({ name, price, isStocked }: ProductProps) {
  const productName = isStocked ? (
    name
  ) : (
    <span style={{ color: "red" }}>{name}</span>
  );

  return (
    <>
      <TableRow>
        <TableCell align="center">{productName}</TableCell>
        <TableCell align="center">${price}</TableCell>
      </TableRow>
    </>
  );
}

interface ProductTableColumnsProps {
  columns: string[];
}

const ProductTableColumns = ({ columns }: ProductTableColumnsProps) => {
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell key={columns.length} align="center" sx={{ fontWeight: 700 }}>
            {column}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

interface ProductTableProps {
  products: ProductProps[];
}

const ProductTable = ({ products }: ProductTableProps) => {
  const [filterText, setFilterText] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);

  const handleFilterTextChange = (text: string) => {
    setFilterText(text);
  };

  const handleInStockOnlyChange = (checked: boolean) => {
    setInStockOnly(checked);
  };

  const rows: JSX.Element[] = [];
  let lastCategory: string | null = null;

  products.forEach((product) => {
    if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
      return;
    }
    if (inStockOnly && !product.isStocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category}
        />
      );
    }

    rows.push(
      <ProductRow
        price={product.price}
        name={product.name}
        isStocked={product.isStocked}
        category={product.category}
      />
    );
    lastCategory = product.category;
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TableContainer component={Paper}>
          <FormGroup sx={{ alignContent: "center" }}>
            <SearchBar
              filterText={filterText}
              inStockedOnly={inStockOnly}
              onFilterTextChange={handleFilterTextChange}
              onInStockOnlyCheck={handleInStockOnlyChange}
            />
          </FormGroup>

          <Table aria-label="simple table">
            <ProductTableColumns columns={COLUMNS} />
            <TableBody>{rows}</TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default ProductTable;
