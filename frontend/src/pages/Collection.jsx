import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory] = useState([]);  // For Category 
  const [subCategory, setSubCategory] = useState([]); // For Type
  const [sortType, setSortType] = useState('relavent'); // For relavent

  // For Category 
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setCategory(prev => [...prev, e.target.value])
    }
  }

  // For Type
  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value))
    } else {
      setSubCategory(prev => [...prev, e.target.value])
    }
  }

  // For FILTERS
  const applyFilter = () => {
    //use slice() - copy all of the products array in productsCopy variable
    let productsCopy = products.slice();


    //if the true, 
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      //filter() - will pass the individual item
      //check if the category we have created, productcategory is available 
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory))
    }

    setFilterProducts(productsCopy)
  }

  // For relavent
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case "low-high":
        // => a - b sorts numbers inm ascending order
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;
      case "high-low":
        // => b - a sorts numbers in de-ascending order
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;
      
      default: 
        applyFilter();
        break;
    }
  }

    // For FILTERS
  useEffect(() => {
    applyFilter()
  }, [category, subCategory, search, showSearch, products])

  // For relavent
  useEffect(() => {
    sortProduct();
  },[sortType])

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Left Side */}
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='uppercase my-2 text-xl flex items-center cursor-pointer gap-2'>filters
          <img className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium uppercase'>Category</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className="w-3" type="checkbox" value={'Men'} onChange={toggleCategory} /> Men
            </p>
            <p className='flex gap-2'>
              <input className="w-3" type="checkbox" value={'Women'} onChange={toggleCategory} /> Women
            </p>
            <p className='flex gap-2'>
              <input className="w-3" type="checkbox" value={'Kids'} onChange={toggleCategory} /> Kids
            </p>
          </div>
        </div>
        {/* SubCategory Filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? "" : "hidden"} sm:block`}>
          <p className='mb-3 text-sm font-medium uppercase'>Type</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            <p className='flex gap-2'>
              <input className="w-3" type="checkbox" value={'Topwear'} onChange={toggleSubCategory} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input className="w-3" type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input className="w-3" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
            </p>
          </div>
        </div>
      </div>


      {/* Right Side */}
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>

            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to high </option>
            <option value="high-low">Sort by: High to low </option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, idx) => (
              <ProductItem
                key={idx}
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
