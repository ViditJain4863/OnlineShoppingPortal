using Assignment.Contracts.DTO;
using FluentValidation;

namespace Assignment.Core.Validators
{
    public class CreateProductDTOValidator : AbstractValidator<CreateProductDTO>
    {
        public CreateProductDTOValidator()
        {
            // RuleFor(x => x.ProjectCode).NotEmpty().WithMessage("Project code is required");
            // RuleFor(x => x.ProjectDescription).NotEmpty().WithMessage("Provide a brief project description about the App");
            // RuleFor(x => x.ProjectName).NotEmpty().WithMessage("Project name is required");
            // RuleFor(x => x.ProjectStart).NotEmpty().WithMessage("Project start is required");
            // RuleFor(x => x.ProjectEnd).NotEmpty().WithMessage("Project end is required");
        }
    }
}
