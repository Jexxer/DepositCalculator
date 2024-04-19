using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace restapi.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddPortSplitMethod : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "SplitMethod",
                table: "Portfolio",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SplitMethod",
                table: "Portfolio");
        }
    }
}
